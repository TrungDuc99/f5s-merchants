import {useDonHang, useDonHangCount} from '@api';
import {FlatListBase, Header, Screen, SearchBar} from '@components/base';
import VoucherItem from '@components/base/voucher-item';
import {Colors, ScaleSize, Spacing} from '@configs';
import {DonHang, DonHangCount, PaginationParams, QueryParams} from '@models';
import {MainStackParamList} from '@navigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, CardRemove, CardSlash, CardTick, Icon} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import ButtonFilter from './button-filter';
type ButtonFilter = {
  id: number;
  icon: Icon;
  backgroundColor: string;
  backgroundColorInactive: string;
  title: string;
  count?: number;
  key: string;
};
const buttonFilters: ButtonFilter[] = [
  {
    id: 1,
    title: 'Chưa sử dụng',
    icon: Card,
    backgroundColor: Colors.successColor,
    backgroundColorInactive: '#F1FAF2',
    key: 'chuaSuDung',
  },
  {
    id: 2,
    title: 'Đã sử dụng',
    icon: CardTick,
    backgroundColor: Colors.secondaryColor,
    backgroundColorInactive: '#EEF4FF',
    key: 'daSuDung',
  },
  {
    id: 3,
    title: 'Hết hạn',
    icon: CardRemove,
    backgroundColor: Colors.warnColor,
    backgroundColorInactive: '#FFF7EB',
    key: 'daHetHan',
  },
  {
    id: 4,
    title: 'Đã hủy',
    icon: CardSlash,
    backgroundColor: Colors.errorColor,
    backgroundColorInactive: '#FFF3F3',
    key: 'daHuy',
  },
];

const OrderScreen = () => {
  //tien 25 7 2 0

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
  const infoUser = useSelector((state: any) => state.userReducer.infoUser);
  const {data, isLoading, refetch, fetchNextPage} = useDonHang(filters, setPagination);
  const {data: donHangCount} = useDonHangCount();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('donHangList');
    queryClient.invalidateQueries('donHangCount');
  }, [infoUser]);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'MainBottomTab'>>();
  const renderBtnFilter: ListRenderItem<ButtonFilter> = ({item}) => {
    // const marginR = index % 2 === 0 ? Spacing(1) : 0;
    // const marginL = index % 2 !== 0 ? Spacing(1) : 0;

    return (
      <View style={{width: ScaleSize(93)}}>
        <ButtonFilter
          icon={item.icon}
          backgroundColor={item.backgroundColor}
          backgroundColorInactive={item.backgroundColorInactive}
          title={item.title}
          active={item.id === filters.state}
          count={item.count ?? 0}
          onPress={() => {
            filters.state !== item.id && setFilters(prev => ({...prev, state: item.id}));
          }}
        />
      </View>
    );
  };

  const renderItem: ListRenderItem<DonHang> = ({item}) => {
    return (
      <VoucherItem
        item={{
          name: item.productName,
          image: item?.productImage || '',
          expiredDate: item.expiredTime,
          sdtKh: item.customerPhone || '',
          tenKh: item.customerName || '',
          point: item.point,
          totalBill: item.totalBill,
          usedTime: item.lastModified,
        }}
        onPress={() => navigation.navigate('OrderDetail', {productCode: item.code})}
      />
    );
  };

  return (
    <Screen useKeyBoardTrackingView>
      <Header name={infoUser?.tenNhanVien ?? ''} />

      <View row style={{padding: Spacing(4)}}>
        <FlatList
          data={buttonFilters.map(item => ({
            ...item,
            count: donHangCount?.data?.[item.key as keyof DonHangCount],
          }))}
          keyExtractor={item => item.id.toString()}
          horizontal
          bounces={false}
          renderItem={renderBtnFilter}
          ItemSeparatorComponent={() => <View width={Spacing(1.5)} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View marginV-4 />
      {isLoading ? (
        <ActivityIndicator color={Colors.primaryColor} size="large" />
      ) : (
        <>
          <FlatListBase
            data={data?.pages?.flatMap(item => item?.data?.data ?? []) ?? []}
            renderItem={renderItem}
            contentContainerStyle={{
              padding: Spacing(4),
              paddingTop: Spacing(1),
              // paddingBottom: Spacing(30),
            }}
            pagination={pagination}
            onLoadMore={fetchNextPage}
            onRefresh={refetch}
          />
        </>
      )}

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

export default OrderScreen;
const styles = StyleSheet.create({
  wrapSearch: {
    position: 'absolute',
    bottom: Spacing(2),
    left: Spacing(1),
    right: Spacing(1),
    alignItems: 'flex-end',
  },
});
