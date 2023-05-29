import {ScaleSize} from '@configs';
import {formatNumber} from '@utils';
import moment from 'moment';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Card, View} from 'react-native-ui-lib';
import CardBase from '../card-base';
import Divider from '../divider';
import TextBase from '../text-base';

export type VoucherItemProps = {
  item: {
    name: string;
    image: string;
    point: number;
    sdtKh?: string;
    tenKh?: string;
    expiredDate: string | Date;
    totalBill: number;
    usedTime: string;
  };
  onPress: () => void;
};
const VoucherItem = ({item, onPress}: VoucherItemProps) => {
  return (
    <Card padding-10 elevation={20} onPress={onPress} backgroundColor="#fff">
      <TextBase fontFamily="SemiBold">{item.name}</TextBase>
      <Divider marginV-8 />
      <View row centerV>
        {item.image !== '' && (
          <FastImage
            style={{width: ScaleSize(100), height: ScaleSize(80), borderRadius: ScaleSize(4)}}
            source={{
              uri: item?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        <View marginL-12 spread paddingV-8>
          <View row>
            <TextBase fontSize={12}>
              Số điểm:&nbsp;
              <TextBase fontFamily="SemiBold" fontSize={12}>
                {formatNumber(item.point)}
              </TextBase>
            </TextBase>
            <View width={ScaleSize(1)} marginV-4 marginH-12 backgroundColor="#EDECEC" />
            <TextBase fontSize={12}>
              Loại:&nbsp;
              <TextBase fontFamily="SemiBold" fontSize={12}>
                Voucher
              </TextBase>
            </TextBase>
          </View>
          <TextBase fontSize={12}>
            Ngày hết hạn:&nbsp;
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {moment(item.expiredDate).format('DD/MM/YYYY')}
            </TextBase>
          </TextBase>
          <TextBase fontSize={12}>
            Họ tên khách hàng:&nbsp;
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {item.tenKh}
            </TextBase>
          </TextBase>
          <TextBase fontSize={12}>
            Số điện thoại khách hàng:&nbsp;
            <TextBase fontFamily="SemiBold" fontSize={12}>
              {item.sdtKh}
            </TextBase>
          </TextBase>
          {item.totalBill && (
            <>
              <TextBase fontSize={12}>
                Tổng bill:&nbsp;
                <TextBase fontFamily="SemiBold" fontSize={12}>
                  {formatNumber(item.totalBill ?? '')}
                </TextBase>
              </TextBase>
              <TextBase fontSize={12}>
                Ngày cập nhật:&nbsp;
                <TextBase fontFamily="SemiBold" fontSize={12}>
                  {moment(item.usedTime).format('DD/MM/YYYY')}
                </TextBase>
              </TextBase>
            </>
          )}
        </View>
      </View>
    </Card>
  );
};

export default VoucherItem;
