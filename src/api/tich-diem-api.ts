import {useAuth} from '@core';
import {TaoTichDiemReq} from '@models';
import {showSuccessMessage} from '@utils';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {PaginationParams, QueryParams, ResponseData} from '../models/common';
import axiosClient from './axios-client';

const tichDiemApi = {
  taoTichDiem: (data: TaoTichDiemReq): Promise<ResponseData<any>> => {
    const url = '/tichDiem/tao';
    return axiosClient.post(url, data);
  },
  lichSuTichDiem: (params: QueryParams): Promise<ResponseData<any>> => {
    const url = '/tichDiem';
    return axiosClient.get(url, {params});
  },
};
export const useTaoTichDiem = () => {
  const queryClient = useQueryClient();
  return useMutation(tichDiemApi.taoTichDiem, {
    onSuccess() {
      showSuccessMessage('Tạo tích điểm thành công');
      queryClient.invalidateQueries('lichSuTichDiemList');
    },
  });
};
export const useTichDiem = (
  filters: QueryParams,
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>
) => {
  const {infoUser} = useAuth();
  return useInfiniteQuery(
    ['lichSuTichDiemList', filters],
    async ({pageParam = 1}) => {
      return tichDiemApi.lichSuTichDiem({
        ...filters,
        pageNumber: pageParam,
        email: infoUser?.email,
        userId: infoUser?.id,
      });
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage && lastPage.data.hasNext) {
          return page.length + 1;
        }
      },
      onSuccess: dataResult => {
        if (dataResult) {
          const {pages} = dataResult;
          if (pages[0]) {
            const {currentPage, totalPages, pageSize, totalCount, hasNext, hasPrevious} =
              pages[0]?.data;
            setPagination({currentPage, hasNext, hasPrevious, pageSize, totalCount, totalPages});
            // console.log(dataResult, dataResult.pages[0]?.data, '323423');
          }
        }
      },
    }
  );
};
export default tichDiemApi;
