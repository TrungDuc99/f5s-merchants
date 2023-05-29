import {useTaoTichDiem} from '@api';
import uploadApi from '@api/upload-api';
import {ButtonBase, CardBase} from '@components/base';
import DialogConfirm from '@components/base/dialog-confirm';
import {InputField} from '@components/forms';
import {ScaleSize, Spacing} from '@configs';
import {TaoTichDiemReq} from '@models';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Barcode,
  Camera,
  DiscountShape,
  Money,
  Scanner,
  ShieldCross,
  ShieldTick,
} from 'iconsax-react-native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useToast} from 'react-native-toast-notifications';
import {Image, View} from 'react-native-ui-lib';

const ScanCodeScreen = ({code, file}: {code: any; file: any}) => {
  const form = useForm<any>({});
  const toast = useToast();
  const {handleSubmit, reset} = form;
  const [openConfirm, setOpenConfirm] = React.useState(false);
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

  React.useEffect(() => {
    if (code) {
      form.setValue('clientCode', code);
    }
    if (file) {
      setImageBillTotal(file);
    }
  }, [file, code]);
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
  const mutationTichDiem = useTaoTichDiem();
  const onSubmit = async (data: any) => {
    const getUrl = await uploadBill();

    const url: string = Object.values(getUrl?.data ?? {})[0] as string;
    if (url) {
      const newData: TaoTichDiemReq = {
        channel: 'BSH',
        discount: data.discount,
        maKh: data.clientCode,
        point: data.point,
        // total: (Number(data.discount) * Number(data.point)) / 100,
        total: Number(data.point),
        urlImageBill: url || '',
      };
      await mutationTichDiem.mutateAsync(newData, {
        onSuccess: () => {
          setImageBillTotal(undefined);
          reset();
        },
      });
      setOpenConfirm(false);
    }
  };

  const imageFromCameraToMarker = async () => {
    try {
      const res = await ImagePicker.openCamera({
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
        navigation.navigate('ViewImage', {file: file1, idScreen: '1'});
      }
    } catch (error) {}
  };

  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'MainBottomTab'>>();
  return (
    <View flex paddingT-20 style={{backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View margin-20 marginT-0 flex>
          <InputField
            name="clientCode"
            form={form}
            label=""
            placeholder="Nhập mã khách hàng"
            iconLeft={{iconName: Barcode}}
            iconRight={{
              iconName: Scanner,
              onPress: () => navigation.navigate('Scaner', {scanType: 2}),
            }}
          />
          {/* 
          <InputField
            name="discount"
            form={form}
            label=""
            isNumber
            placeholder="Nhập phần trăm giảm giá"
            iconLeft={{iconName: DiscountShape}}
          /> */}
          <View marginV-10 />

          <InputField
            name="point"
            form={form}
            label=""
            isFormatNumber
            isNumber
            placeholder="Nhập tiền"
            iconLeft={{iconName: Money}}
          />
          <View marginV-10 />

          {imageBillTotal?.uri && (
            <CardBase marginT-16 backgroundColor="red">
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
          {imageBillTotal?.uri ? (
            <View row>
              <View flex marginR-8>
                <ButtonBase
                  marginT-20
                  bgColor="#FF6077"
                  label="Hủy"
                  iconSource={() => <ShieldCross color="#fff" style={{marginRight: Spacing(2)}} />}
                  onPress={() => {
                    setImageBillTotal(undefined);
                  }}
                />
              </View>
              <View flex marginL-8>
                <ButtonBase
                  marginT-20
                  label="Sử dụng"
                  iconSource={() => <ShieldTick color="#fff" style={{marginRight: Spacing(2)}} />}
                  onPress={() => {
                    setOpenConfirm(true);
                  }}
                />
              </View>
            </View>
          ) : form.watch('point') ? (
            <ButtonBase
              marginT-20
              label="CHỤP HÓA ĐƠN"
              iconSource={() => <Camera color="#fff" style={{marginRight: Spacing(2)}} />}
              onPress={imageFromCameraToMarker}
            />
          ) : (
            <View />
          )}
          <View marginV-10 />
        </View>

        {/* <View margin-4 flex>
            <ButtonBase
              label="Quét mã"
              onPress={() => {
                navigation.navigate('Scaner', {scanType: 2});
              }}
              iconSource={() => <Scan color="#fff" style={{marginRight: Spacing(2)}} />}
            />
          </View> */}
      </KeyboardAwareScrollView>
      <DialogConfirm
        open={openConfirm}
        content="Bạn có chắc chắn muốn tạo tích điểm?"
        onClose={() => setOpenConfirm(false)}
        onAccept={handleSubmit(onSubmit)}
        loading={form.formState.isSubmitting}
      />
    </View>
  );
};

export default ScanCodeScreen;
