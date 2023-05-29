import {
  CardBase,
  Divider,
  FlatListBase,
  Screen,
  SearchBar,
  TextBase,
  Toolbar,
  TouchableOpacityBase,
} from '@components/base';
import {Colors, ScaleSize, Spacing} from '@configs';
import {PaginationParams, QueryParams, Voucher} from '@models';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatNumber} from '@utils';
import React, {useState} from 'react';
import {ActivityIndicator, ListRenderItem, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Card, View} from 'react-native-ui-lib';
import {useVoucher} from '../../api';

const VoucherScreen = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'MainBottomTab'>>();
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    state: 1,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 1,
    hasPrevious: false,
    hasNext: false,
  });
  const {data, isLoading, refetch, fetchNextPage} = useVoucher(filters, setPagination);

  const renderItem: ListRenderItem<Voucher> = ({item}) => {
    return (
      <Card elevation={20} padding-10>
        <TouchableOpacityBase
          backgroundColor="#fff"
          onPress={() =>
            navigation.navigate('VoucherDetail', {voucherId: item.id, showDecription: true})
          }
        >
          <TextBase fontFamily="SemiBold">{item.name}</TextBase>
          <Divider marginV-8 />
          <View row>
            <FastImage
              style={{width: ScaleSize(100), height: ScaleSize(60), borderRadius: ScaleSize(4)}}
              source={{
                uri: item.image,
              }}
              resizeMode={'contain'}
            />
            <View marginL-12 spread paddingV-8>
              <View row>
                <TextBase fontSize={12}>
                  Số điểm:&nbsp;
                  <TextBase fontFamily="SemiBold" fontSize={12}>
                    {formatNumber(item.price)}
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
              {/* <TextBase fontSize={12}>
                Ngày hết hạn:&nbsp;
                <TextBase fontFamily="SemiBold" fontSize={12} numberOfLines={2}>
                  {item.term}
                </TextBase>
              </TextBase> */}
            </View>
          </View>
        </TouchableOpacityBase>
      </Card>
    );
  };

  return (
    <Screen useKeyBoardTrackingView>
      <Toolbar title="Voucher" />
      <View marginV-5 />
      <View>
        {isLoading ? (
          <ActivityIndicator color={Colors.primaryColor} size="large" />
        ) : (
          <FlatListBase
            data={data?.pages?.flatMap(item => item?.data?.data ?? []) ?? []}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
              padding: Spacing(4),
              paddingTop: Spacing(1),
              // paddingBottom: Spacing(50),
            }}
            pagination={pagination}
            onLoadMore={fetchNextPage}
            onRefresh={refetch}
          />
        )}
      </View>

      <View style={styles.wrapSearch}>
        <SearchBar
          useCollapse
          onSubmit={value => {
            setFilters(prev => ({...prev, search: value}));
          }}
        />
      </View>
    </Screen>
  );
};

export default VoucherScreen;
const styles = StyleSheet.create({
  wrapSearch: {
    position: 'absolute',
    bottom: Spacing(2),
    left: Spacing(1),
    right: Spacing(1),
    alignItems: 'flex-end',
  },
});
