import {useTichDiem} from '@api';
import {
  CardBase,
  Divider,
  FlatListBase,
  Screen,
  TextBase,
  TouchableOpacityBase,
} from '@components/base';
import {Colors, ScaleSize, Spacing} from '@configs';
import {PaginationParams, QueryParams, TichDiemRes} from '@models';
import {formatNumber} from '@utils';
import React, {useState} from 'react';
import {ActivityIndicator, ListRenderItem} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-ui-lib';

const ImportCodeScreen = () => {
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
  const {data, isLoading, refetch, fetchNextPage} = useTichDiem(filters, setPagination);

  const renderItem: ListRenderItem<TichDiemRes> = ({item}) => {
    return (
      <CardBase>
        <TouchableOpacityBase backgroundColor="#fff">
          <TextBase fontFamily="SemiBold"> Mã khách hàng: {item.maKh}</TextBase>
          <Divider marginV-8 />
          <View row>
            <FastImage
              style={{width: ScaleSize(100), height: ScaleSize(60), borderRadius: ScaleSize(4)}}
              source={{
                uri: item.urlImageBill,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View marginL-12 spread paddingV-8>
              <View row>
                <TextBase fontSize={12}>
                  Điểm:&nbsp;
                  <TextBase fontFamily="SemiBold" fontSize={12}>
                    {formatNumber(item.point)}
                  </TextBase>
                </TextBase>
                <View width={ScaleSize(1)} marginV-4 marginH-12 backgroundColor="#EDECEC" />
                <TextBase fontSize={12}>
                  Giảm giá:&nbsp;
                  <TextBase fontFamily="SemiBold" fontSize={12}>
                    {item.discount}%
                  </TextBase>
                </TextBase>
              </View>
              <TextBase fontSize={12}>
                Tổng điểm:&nbsp;
                <TextBase fontFamily="SemiBold" fontSize={12} numberOfLines={2}>
                  {formatNumber(item.total)}
                </TextBase>
              </TextBase>
            </View>
          </View>
        </TouchableOpacityBase>
      </CardBase>
    );
  };
  return (
    <Screen flex paddingT-20 style={{backgroundColor: '#fff'}}>
      {isLoading ? (
        <ActivityIndicator color={Colors.primaryColor} size="large" />
      ) : (
        <FlatListBase
          data={data?.pages?.flatMap(item => item?.data.data ?? []) ?? []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: Spacing(4),
            paddingTop: Spacing(1),
          }}
          pagination={pagination}
          onLoadMore={fetchNextPage}
          onRefresh={refetch}
        />
      )}
    </Screen>
  );
};

export default ImportCodeScreen;
