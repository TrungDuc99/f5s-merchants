import {useUpdateDonHang} from '@api/don-hang-api';
import uploadApi from '@api/upload-api';
import {
  ButtonBase,
  CardBase,
  Divider,
  Screen,
  TextBase,
  Toolbar,
  TouchableOpacityBase,
} from '@components/base';
import DialogConfirm from '@components/base/dialog-confirm';
import ExpandableBase from '@components/base/expandable-base';
import {InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {Response} from '@models';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import Clipboard from '@react-native-clipboard/clipboard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatNumber, showSuccessMessage} from '@utils';
import {Camera, DocumentCopy, DollarCircle, ShieldCross, ShieldTick} from 'iconsax-react-native';
import moment from 'moment';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {ActivityIndicator, Image, ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import {isIphoneX} from 'react-native-iphone-x-helper';
import QRCode from 'react-native-qrcode-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';
import {Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {useChiTietDonHang} from '../../api';
import RenderHtml from 'react-native-render-html';
const OderDetailScreen = () => {
  const {
    params: {productCode, file},
  } = useRoute<RouteProp<MainStackParamList, 'OrderDetail'>>();
  const {width} = useWindowDimensions();
  const form = useForm();
  const [messageErr, setMessageErr] = React.useState<Response>();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'MainBottomTab'>>();
  const {data, isLoading} = useChiTietDonHang(productCode, {
    // onSuccess: (result: any) => {
    //   form.setValue('totalBill', result?.data?.totalBill);
    // },
    onError: (error: any) => {
      setMessageErr(error);
    },
  });

  const userInfo = useSelector((state: any) => state.userReducer.infoUser);
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const {getValues, handleSubmit} = form;
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [viewImg, setViewImg] = React.useState(false);
  const [imageBillTotal, setImageBillTotal] =
    React.useState<
      | {
          uri: string;
          path: string;
          name: string;
          type: string;
          width: number;
          height: number;
          size: number;
        }
      | undefined
    >();

  const mutationUpdate = useUpdateDonHang();

  React.useEffect(() => {
    form.setValue('totalBill', data?.data.totalBill ? data?.data.totalBill + '' : '');
    setImageBillTotal(file);
  }, [file, data]);

  const uploadBill = async () => {
    let resDinhKem;
    const formData = new FormData();
    formData.append('bucket', 'doiSoat');
    formData.append('files', {
      uri: imageBillTotal?.path ?? '',
      name: imageBillTotal?.name ?? '',
      type: imageBillTotal?.type ?? '',
    });

    try {
      resDinhKem = await uploadApi.uploadFiles(formData);
    } catch (error) {
      toast.show(`Đã xảy ra lỗi upload ${JSON.stringify(error)}`, {
        type: 'danger_toast',
        animationDuration: 100,
      });
      // showErrorMessage('Đã xảy ra lỗi upload ' + JSON.stringify(error));
    }

    return resDinhKem;
  };
  const onSubmit = async () => {
    setOpenConfirm(true);
  };

  const imageFromCameraToMarker = async () => {
    try {
      const res = await ImagePicker.openCamera({
        // compressImageMaxWidth: 720,
        // compressImageMaxHeight: 1080,
        // cropping: true,
        compressImageQuality: 0.3,
      });
      const arr = res.path.split('/');
      const file1 = {
        //  uri: Platform.OS === 'ios' ? res.path : `file://${res.path}`,
        uri: res.path,
        path: res.path,
        name: arr[arr.length - 1],
        type: res.mime,
        size: res.size,
        width: res.width,
        height: res.height,
      };

      if (file1.uri) {
        setImageBillTotal(file1);
        navigation.navigate('ViewImage', {file: file1, productCode: productCode});
      }
    } catch (error) {}
  };
  console.log(data?.data?.sanPham.content, 'asdadasd');
  return (
    <Screen>
      {!isLoading ? (
        <>
          <Toolbar title="Chi tiết" />
          <View flex>
            {data ? (
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                  <CardBase>
                    <View padding-7>
                      <View style={styles.maEgift}>
                        <TextBase color="#ffff" fontSize={13}>
                          Mã Egift:
                          <TextBase color="#ffff" fontFamily="SemiBold" fontSize={12}>
                            {data?.data.code}
                          </TextBase>
                        </TextBase>
                      </View>
                      <TouchableOpacityBase onPress={() => setViewImg(true)}>
                        <FastImage
                          style={{
                            width: '100%',
                            height: ScaleSize(240),
                            borderRadius: ScaleSize(4),
                          }}
                          source={{
                            uri:
                              data?.data.thumbnail &&
                              (data?.data.thumbnail.split(':')[0] === 'https' ||
                                data?.data.thumbnail.split(':')[0] === 'http')
                                ? data?.data.thumbnail
                                : data?.data.productImage
                                ? data?.data.productImage
                                : data?.data.sanPham.image,
                          }}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacityBase>

                      <TextBase marginT-10 fontFamily="SemiBold">
                        {data?.data?.productName}
                      </TextBase>
                      <Divider marginV-8 />

                      <View row style={{justifyContent: 'space-between'}}>
                        <TextBase fontSize={13}>
                          Số điểm:
                          <TextBase fontFamily="SemiBold" fontSize={12}>
                            {formatNumber(data?.data?.point ?? '')}
                          </TextBase>
                        </TextBase>
                        <View width={ScaleSize(1)} marginV-4 backgroundColor="#EDECEC" />
                        {/* <TextBase fontSize={13}>
                          Loại:
                          <TextBase fontFamily="SemiBold" fontSize={12}>
                            {data?.data?.voucher?.sanPham?.type === 1 ? ' Voucher' : ' Quà'}
                          </TextBase>
                        </TextBase> */}
                        <View width={ScaleSize(1)} marginV-4 backgroundColor="#EDECEC" />
                        <TextBase fontSize={13}>
                          Ngày hết hạn:
                          <TextBase fontFamily="SemiBold" fontSize={12}>
                            {` ${moment(data?.data?.expiredTime).format('DD/MM/YYYY')}`}
                          </TextBase>
                        </TextBase>
                      </View>

                      <View row marginV-15>
                        <View centerV>
                          <QRCode
                            value={data?.data?.linkUse ? data?.data?.linkUse : data?.data?.code}
                            size={ScaleSize(50)}
                            ecl="Q"
                          />
                        </View>
                        <View marginL-20 centerV>
                          <View row centerV>
                            <TextBase fontSize={13}>
                              Link sử dụng:
                              <TextBase fontFamily="SemiBold" fontSize={13}>
                                &nbsp;{data?.data?.linkUse || 'Chưa có link'}
                              </TextBase>
                            </TextBase>
                            <TouchableOpacityBase
                              marginL-8
                              onPress={() => {
                                Clipboard.setString(data?.data?.linkUse ?? '');
                                showSuccessMessage('Đã sao chép');
                              }}
                            >
                              <DocumentCopy color={'#0FB996'} />
                            </TouchableOpacityBase>
                          </View>
                          <View
                            width={ScaleSize(1)}
                            marginV-4
                            marginH-12
                            backgroundColor="#EDECEC"
                          />
                          <TextBase fontSize={13}>
                            Trang thái:
                            <TextBase
                              fontFamily="SemiBold"
                              color={
                                data?.data?.state === 1
                                  ? Colors.successColor
                                  : data?.data?.state === 2
                                  ? Colors.primaryColor
                                  : data?.data?.state === 4
                                  ? Colors.errorColor
                                  : Colors.warnColor
                              }
                              fontSize={12}
                            >
                              {data?.data?.state === 1
                                ? '  Chưa sử dụng'
                                : data?.data?.state === 2
                                ? '  Đã sử dụng'
                                : data?.data?.state === 4
                                ? '  Đã hủy'
                                : '  Hết hạn'}
                            </TextBase>
                          </TextBase>
                          <TextBase fontSize={13}>
                            Mã khách hàng:
                            <TextBase fontFamily="SemiBold" fontSize={13}>
                              &nbsp;{data?.data?.customerContractCode || 'Chưa có thông tin'}
                            </TextBase>
                          </TextBase>
                          <TextBase fontSize={13}>
                            Tên khách hàng:
                            <TextBase fontFamily="SemiBold" fontSize={13}>
                              &nbsp;{data?.data?.customerName || 'Chưa có thông tin'}
                            </TextBase>
                          </TextBase>
                          <TextBase fontSize={13}>
                            Số điện thoại khách hàng:
                            <TextBase fontFamily="SemiBold" fontSize={13}>
                              &nbsp;{data?.data?.customerPhone || 'Chưa có thông tin'}
                            </TextBase>
                          </TextBase>
                          <TextBase fontSize={13}>
                            Mã hợp đồng:
                            <TextBase fontFamily="SemiBold" fontSize={13}>
                              &nbsp;{data?.data?.customerContractCode || 'Chưa có thông tin'}
                            </TextBase>
                          </TextBase>
                          <TextBase fontSize={13}>
                            Nơi mua voucher:
                            <TextBase fontFamily="SemiBold" fontSize={13}>
                              &nbsp;{data?.data?.channel || 'Chưa có thông tin'}
                            </TextBase>
                          </TextBase>
                        </View>
                      </View>
                      <ExpandableBase
                        marginH-5
                        children={
                          <View paddingB-2>
                            <RenderHtml
                              contentWidth={width}
                              source={{html: data?.data?.sanPham.content || ''}}
                            />
                            {/* <HTMLView
                              value={data?.data?.sanPham.content || ''}
                              addLineBreaks={false}
                              stylesheet={htmlStyles}
                              textComponentProps={{style: {color: Colors.textColor}}}
                            />
                            <View marginB-25 />
                            <HTMLView
                              textComponentProps={{style: {color: Colors.textColor}}}
                              value={data?.data?.sanPham.term || ''}
                              addLineBreaks={false}
                              stylesheet={htmlStyles}
                            /> */}

                            <RenderHtml
                              contentWidth={width}
                              source={{html: data?.data?.sanPham.term || ''}}
                            />
                            <View marginB-10 />
                          </View>
                        }
                      />
                    </View>
                  </CardBase>
                  {data?.data?.state !== 4 && data?.data?.state !== 3 && (
                    <>
                      <InputField
                        marginT-16
                        iconRight={{
                          iconName: DollarCircle,
                          component: (
                            <TextBase fontFamily="Bold" color={Colors.primaryColor}>
                              VND
                            </TextBase>
                          ),
                        }}
                        form={form}
                        isNumber
                        isFormatNumber
                        name="totalBill"
                        label=""
                        editable={data?.data?.state !== 1 ? false : true}
                        placeholder="Nhập vào tổng tiền"
                        rules={{
                          required: {
                            value: true,
                            message: 'Vui lòng nhập tổng tiền',
                          },
                        }}
                      />
                      {form.watch('totalBill') ? (
                        <TextBase fontFamily="Bold" fontSize={14} marginT-12>
                          Giảm giá {data?.data?.sanPham?.discount ?? 0}%. Số tiền thanh toán là:{' '}
                          {formatNumber(
                            form.watch('totalBill') -
                              Number(form.watch('totalBill')) * (data?.data?.sanPham?.discount ?? 0)
                          )}
                        </TextBase>
                      ) : null}
                    </>
                  )}

                  {data?.data?.state !== 1 && data?.data?.totalBillImage && (
                    <CardBase marginT-16>
                      <FastImage
                        source={{uri: data.data.totalBillImage}}
                        resizeMode="cover"
                        style={{
                          width: '100%',
                          height: ScaleSize(500),
                        }}
                      />
                    </CardBase>
                  )}
                  {imageBillTotal?.uri && (
                    <CardBase marginT-16>
                      <Image
                        source={{uri: imageBillTotal?.uri}}
                        resizeMode="center"
                        style={{
                          width: '100%',
                          height: ScaleSize(500),
                        }}
                      />
                    </CardBase>
                  )}
                </View>
              </ScrollView>
            ) : (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {!messageErr?.Succeeded
                  ? messageErr?.Message
                  : 'Không tồn tại mã này, vui lòng thử lại!'}
                {/* Không tồn tại mã này, vui lòng thử lại! */}
              </Text>
            )}
          </View>
          {data?.data.state === 1 && (
            <View
              style={{
                padding: Spacing(4),
                paddingBottom: isIphoneX() ? insets.bottom : Spacing(4),
              }}
            >
              {imageBillTotal?.uri ? (
                <View row>
                  <View flex marginR-8>
                    <ButtonBase
                      marginT-20
                      bgColor="#FF6077"
                      label="Hủy"
                      iconSource={() => (
                        <ShieldCross color="#fff" style={{marginRight: Spacing(2)}} />
                      )}
                      onPress={() => {
                        setImageBillTotal(undefined);
                      }}
                    />
                  </View>
                  <View flex marginL-8>
                    <ButtonBase
                      marginT-20
                      label="Sử dụng"
                      iconSource={() => (
                        <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />
                      )}
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              ) : (
                <ButtonBase
                  label="CHỤP HÓA ĐƠN"
                  iconSource={() => <Camera color="#fff" style={{marginRight: Spacing(2)}} />}
                  onPress={imageFromCameraToMarker}
                />
              )}
            </View>
          )}
          <DialogConfirm
            open={openConfirm}
            content="Bạn có chắc chắn muốn sử dụng voucher này?"
            onClose={() => setOpenConfirm(false)}
            onAccept={async () => {
              if (data && data.data.id) {
                setLoadingUpload(true);
                try {
                  const getUrl = await uploadBill();

                  const url: string = Object.values(getUrl?.data ?? {})[0] as string;

                  if (url) {
                    await mutationUpdate.mutateAsync(
                      {
                        email: userInfo.email,
                        id: data.data.id,
                        state: 2,
                        totalBillImage: url,
                        totalBill: getValues('totalBill'),
                      },
                      {
                        onSuccess: () => {
                          navigation.goBack();
                        },
                      }
                    );
                  }
                } catch (error) {
                } finally {
                  setLoadingUpload(false);
                  setOpenConfirm(false);
                }
              } else {
                toast.show('Lỗi thông tin đơn hàng ', {
                  type: 'danger_toast',
                });
              }
            }}
            loading={loadingUpload}
          />

          <ImageView
            images={[
              {
                uri: data?.data?.productImage,
              },
            ]}
            imageIndex={0}
            visible={viewImg}
            swipeToCloseEnabled
            onRequestClose={() => setViewImg(false)}
          />
        </>
      ) : (
        <View centerH centerV flex>
          <ActivityIndicator style={{marginRight: Spacing(1)}} color={Colors.primaryColor} />
        </View>
      )}
    </Screen>
  );
};

export default OderDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing(4),
    flex: 1,
  },
  maEgift: {
    padding: 7,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    backgroundColor: '#aba9a9cc',
    top: 15,
    left: 7,
    zIndex: 99,
    alignItems: 'flex-end',
  },
});
const htmlStyles = StyleSheet.create({
  p: {
    marginTop: -15,
    marginBottom: -15,
  },
  ul: {
    marginTop: 5,
    marginBottom: 5,
  },
  ol: {
    marginTop: 5,
    marginBottom: 5,
  },
});
