import {useChiTietVoucher} from '../../api';
import {Screen, Toolbar} from '@components/base';
import CardVoucher from '@components/base/card-voucher';
import {Spacing} from '@configs';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';
interface VoucherDetailProps {}

const VoucherDetailScreen = (props: VoucherDetailProps) => {
  const {
    params: {voucherId, showDecription},
  } = useRoute<RouteProp<MainStackParamList, 'VoucherDetail'>>();
  const insets = useSafeAreaInsets();
  const {data, isLoading} = useChiTietVoucher(voucherId + '');
  return (
    <Screen>
      {!isLoading ? (
        <>
          <Toolbar title="Chi tiết" />
          <ScrollView style={styles.container}>
            <View style={{marginBottom: insets.bottom + Spacing(4)}}>
              <CardVoucher showDecription={showDecription} data={data?.data} />
            </View>
          </ScrollView>
        </>
      ) : (
        <View flex centerH centerV>
          <ActivityIndicator />
        </View>
      )}
    </Screen>
  );
};

export default VoucherDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing(4),
  },
});
