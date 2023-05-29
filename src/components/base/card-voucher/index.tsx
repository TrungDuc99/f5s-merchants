import {Colors, ScaleSize, Spacing} from '@configs';
import {DocumentCopy, PenAdd} from 'iconsax-react-native';
import moment from 'moment';
import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import QRCode from 'react-native-qrcode-svg';
import {Text, View} from 'react-native-ui-lib';
import CardBase from '../card-base';
import Divider from '../divider';
import ExpandableBase from '../expandable-base';
import TextBase from '../text-base';
import TouchableOpacityBase from '../touchable-opacity-base';
import HTMLView from 'react-native-htmlview';
import ImageView from 'react-native-image-viewing';
interface CardVoucherProps {
  showDecription?: boolean;
  data: any;
}

const CardVoucher = (props: CardVoucherProps) => {
  const {showDecription, data} = props;

  const [viewImg, setViewImg] = React.useState(false);

  return (
    <CardBase>
      <View padding-5>
        <View style={styles.maEgift}>
          <TextBase color="#ffff" fontSize={13}>
            Mã Egift:
            <TextBase color="#ffff" fontFamily="SemiBold" fontSize={12}>
              {data?.productCode}
            </TextBase>
          </TextBase>
        </View>
        <TouchableOpacityBase onPress={() => setViewImg(true)}>
          <FastImage
            style={{width: '100%', height: ScaleSize(240), borderRadius: ScaleSize(4)}}
            source={{uri: data?.image}}
            resizeMode={'contain'}
          />
        </TouchableOpacityBase>
        <TextBase marginT-10 fontFamily="SemiBold">
          {data?.name}
        </TextBase>
        <Divider marginV-8 />
        <View row style={{justifyContent: 'space-between'}}>
          <TextBase fontSize={13}>
            Số điểm:
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {' ' + data?.price}
            </TextBase>
          </TextBase>
          <View width={ScaleSize(1)} marginV-4 backgroundColor="#EDECEC" />
          <TextBase fontSize={13}>
            Loại:
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {data?.sanPham?.type === 1 ? ' Voucher' : ' Voucher'}
            </TextBase>
          </TextBase>
          {/* <View width={ScaleSize(1)} marginV-4 backgroundColor="#EDECEC" />
          <TextBase fontSize={13}>
            Ngày hết hạn:
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {` ${
                data?.expiredTime ? moment(data?.expiredTime).format('DD/MM/YYYY') : 'Không có'
              }`}
            </TextBase>
          </TextBase> */}
        </View>

        {/* <View row marginV-15>
          <TextBase fontSize={13}>
            Trạng thái:
            <TextBase fontFamily="SemiBold" color="#0FB996" fontSize={12}>
              Chưa sử dụng
            </TextBase>
          </TextBase>
          <View width={ScaleSize(1)} marginV-4 marginH-12 backgroundColor="#EDECEC" />
          <TextBase fontSize={13}>
            Địa điểm:
            <TextBase fontFamily="SemiBold" fontSize={12}>
              Toàn quốc
            </TextBase>
          </TextBase>
        </View> */}

        <ExpandableBase
          marginV-10
          marginH-5
          children={
            showDecription ? (
              <>
                {/* <TextBase fontSize={13}>{data?.content}</TextBase> */}
                <View marginT-5 />
                <HTMLView
                  value={data?.content}
                  textComponentProps={{style: {color: Colors.textColor}}}
                  addLineBreaks={false}
                  stylesheet={htmlStyles}
                />
                <View marginB-10 />
                {/* <TextBase fontSize={13}>{data?.term}</TextBase> */}
                <HTMLView
                  value={data?.term}
                  textComponentProps={{style: {color: Colors.textColor}}}
                  addLineBreaks={false}
                  stylesheet={htmlStyles}
                />
              </>
            ) : (
              <View row marginT-15>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#999A9A',
                    width: Platform.OS === 'ios' ? ScaleSize(54) : ScaleSize(55),
                  }}
                >
                  <QRCode value={'F5S.000000123'} size={ScaleSize(50)} ecl="Q" />
                </View>
                <View marginL-20 centerV>
                  <View row centerV>
                    <TextBase fontSize={13}>
                      Link sử dụng:
                      <TextBase fontFamily="SemiBold" fontSize={13}>
                        f5seconds.vn/123abc
                      </TextBase>
                    </TextBase>
                    <TouchableOpacityBase marginL-10>
                      <DocumentCopy color={'#0FB996'} />
                    </TouchableOpacityBase>
                  </View>

                  <View width={ScaleSize(1)} marginV-4 marginH-12 backgroundColor="#EDECEC" />
                  <TextBase fontSize={13}>
                    Trang thái:
                    <TextBase fontFamily="SemiBold" color={Colors.primaryColor} fontSize={12}>
                      Chưa sử dụng
                    </TextBase>
                  </TextBase>
                </View>
              </View>
            )
          }
        />
      </View>
      <ImageView
        images={[
          {
            uri: data?.image,
          },
        ]}
        imageIndex={0}
        visible={viewImg}
        swipeToCloseEnabled
        onRequestClose={() => setViewImg(false)}
      />
    </CardBase>
  );
};

export default CardVoucher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing(5),
    paddingBottom: Spacing(5),
    paddingTop: Spacing(5),
  },
  htmlView: {
    color: Colors.textColor,
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
    marginTop: -10,
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
