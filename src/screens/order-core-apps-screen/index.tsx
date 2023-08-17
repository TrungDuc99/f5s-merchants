import {useDonHangCoreApps, useDonHangCount} from '@api';
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
import {Text, View} from 'react-native-ui-lib';
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
  status: string;
  key: string;
};
const buttonFilters: ButtonFilter[] = [
  {
    id: 1,
    status: 'Pending',
    title: 'Chưa xử lý',
    icon: Card,
    backgroundColor: Colors.warnColor,
    backgroundColorInactive: '#F1FAF2',
    key: 'chuaSuDung',
  },
  {
    id: 2,
    title: 'Trong quá trình',
    icon: CardTick,
    backgroundColor: Colors.secondaryColor,
    backgroundColorInactive: '#EEF4FF',
    key: 'daSuDung',
    status: 'Processing',
  },
  {
    id: 3,
    title: 'Hoàn thành',
    icon: CardRemove,
    backgroundColor: Colors.successColor,
    backgroundColorInactive: '#FFF7EB',
    key: 'daHetHan',
    status: 'Complete',
  },
  {
    id: 4,
    title: 'Đã hủy',
    icon: CardSlash,
    backgroundColor: Colors.errorColor,
    backgroundColorInactive: '#FFF3F3',
    key: 'daHuy',
    status: 'Cancelled',
  },
];

const OrderCoreAppsScreen = () => {
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
  const [data, setData] = useState([]);
  const [status, setStatus] = useState<string>('Processing');
  const {mutate, isLoading} = useDonHangCoreApps();
  useEffect(() => {
    mutate(
      {
        status: status,
      },
      {
        onSuccess: res => {
          setData(res);
        },
        onError(error, variables, context) {},
      }
    );
  }, [status]);

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
            setStatus(item.status);
            filters.state !== item.id && setFilters(prev => ({...prev, state: item.id}));
          }}
        />
      </View>
    );
  };

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <View marginB-10>
        <VoucherItem
          item={{
            name: item.ProductName,
            image: item?.productImage || '',
            expiredDate: item.VoucherExpired,
            sdtKh: item.customerPhone || '',
            tenKh: item.CustomerName || '',
            point: item.point,
            totalBill: item.totalBill,
            usedTime: item.lastModified,
          }}
          onPress={() => navigation.navigate('OrderDetail', {productCode: item.code})}
        />
      </View>
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
          <FlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{
              padding: Spacing(4),
              paddingTop: Spacing(1),
            }}
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

export default OrderCoreAppsScreen;
const styles = StyleSheet.create({
  wrapSearch: {
    position: 'absolute',
    bottom: Spacing(2),
    left: Spacing(1),
    right: Spacing(1),
    alignItems: 'flex-end',
  },
});
