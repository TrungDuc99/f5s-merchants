import {Colors, ScaleSize, Spacing} from '@configs';
import {useScrollToTop} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, FlatListProps, RefreshControl, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {PaginationParams} from 'src/models';
import TextBase from '../text-base';

export interface FlatListBaseProps<T> extends FlatListProps<T> {
  data: T[];
  pagination: PaginationParams;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
}
const FlatListBase = <T extends unknown>({
  data,
  onLoadMore,
  pagination,
  onRefresh,
  refreshing = false,
  isFetchingNextPage = false,
  ...rest
}: FlatListBaseProps<T>) => {
  const ref = React.useRef<any>(null);
  useScrollToTop(ref);
  const {currentPage, totalPages} = pagination;
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isFetchingNextPage ? ( //<Text style={styles.text} children="--- Hết dữ liệu ---" />
          <ActivityIndicator color={Colors.primaryColor} size="large" />
        ) : data.length === 0 ? (
          <TextBase marginT-4>Không có dữ liệu</TextBase>
        ) : (
          <TextBase marginT-4>Hết dữ liệu</TextBase>
        )}
      </View>
    );
  };
  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    }
  };
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <FlatList
      {...rest}
      ref={ref}
      data={data}
      keyExtractor={(item: any, index) => index.toString()}
      // contentContainerStyle={{padding: Spacing(4), paddingTop: Spacing(2)}}
      refreshControl={
        <RefreshControl
          colors={[Colors.primaryColor]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={() => {
        currentPage < totalPages && handleLoadMore();
      }}
      removeClippedSubviews
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default FlatListBase;

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginVertical: Spacing(1),
  },
  text: {
    color: Colors.textColor,
  },
  textError: {
    color: Colors.errorColor,
    fontSize: ScaleSize(12),
  },
  separator: {
    height: Spacing(4),
  },
});
