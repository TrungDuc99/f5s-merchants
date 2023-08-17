import {DonHang, DonHangCount, DonHangUpdateParams, Voucher} from '@models/don-hang';

import {Platform} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {setBadgeCountNoti} from '../../src/initials';
import {PaginationParams, QueryParams, ResponseData, ResultData} from '../models/common';
import axiosClient from './axios-client';
import axiosClientCoreApps from './axios-client-core-apps';

const donHangApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<DonHang>>> => {
    const url = '/donhang/list/';
    return axiosClient.get(url, {params});
  },
  getAllCoreApps: (params: any): Promise<any> => {
    const url = `/orderitem/list?status=${params.status}`;
    return axiosClientCoreApps.get(url);
  },

  findByCode: (voucherCode: string): Promise<ResponseData<DonHang>> => {
    const url = `/donhang/find-by-code?code=${voucherCode}`;

    return axiosClient.get(url);
  },
  update: (data: DonHangUpdateParams): Promise<ResponseData<number>> => {
    const url = `/donhang/update/${data.id}`;
    return axiosClient.put(url, data);
  },
  getAllVoucher: (params: QueryParams): Promise<ResponseData<ResultData<Voucher>>> => {
    const url = '/DonHang/list-voucher';
    return axiosClient.get(url, {params});
  },
  getOne: (voucherId: string | number): Promise<ResponseData<Voucher>> => {
    const url = `/DonHang/san-pham/${voucherId}`;
    return axiosClient.get(url);
  },
  updateVoucher: (data: DonHangUpdateParams): Promise<ResponseData<number>> => {
    const url = `/donhang/update/${data.id}`;
    return axiosClient.put(url, data);
  },
  getCount: (email: string): Promise<ResponseData<DonHangCount>> => {
    const url = `/donhang/list-count?email=${email}`;
    return axiosClient.get(url);
  },
};

export const useVoucher = (
  filters: QueryParams,
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>
) => {
  const infoUser = useSelector((state: any) => state.userReducer.infoUser);
  return useInfiniteQuery(
    ['voucherList', filters],
    async ({pageParam = 1}) => {
      return donHangApi.getAllVoucher({
        ...filters,
        pageNumber: pageParam,
      });
    },
    {
      enabled: !!infoUser?.id,
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
          }
        }
      },
    }
  );
};
export const useDonHang = (
  filters: QueryParams,
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>
) => {
  // const {infoUser} = useAuth();
  const infoUser = useSelector((state: any) => state.userReducer.infoUser);
  return useInfiniteQuery(
    ['donHangList', filters],
    async ({pageParam = 1}) => {
      return donHangApi.getAll({
        ...filters,
        pageNumber: pageParam,
      });
    },
    {
      keepPreviousData: false,
      enabled: !!infoUser?.id,
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
// export const useDonHangCoreApps = (
//   filters: QueryParams,
//   setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>
// ) => {
//   // const {infoUser} = useAuth();
//   return useInfiniteQuery(
//     ['donHangList', filters],
//     async ({pageParam = 1}) => {
//       return donHangApi.getAll({
//         ...filters,
//         pageNumber: pageParam,
//       });
//     },
//     {
//       keepPreviousData: false,

//       getNextPageParam: (lastPage, page) => {
//         if (lastPage && lastPage.data.hasNext) {
//           return page.length + 1;
//         }
//       },
//       onSuccess: dataResult => {
//         if (dataResult) {
//           const {pages} = dataResult;
//           if (pages[0]) {
//             const {currentPage, totalPages, pageSize, totalCount, hasNext, hasPrevious} =
//               pages[0]?.data;
//             setPagination({currentPage, hasNext, hasPrevious, pageSize, totalCount, totalPages});
//             // console.log(dataResult, dataResult.pages[0]?.data, '323423');
//           }
//         }
//       },
//     }
//   );
// };
export const useDonHangCoreApps = () => {
  return useMutation(donHangApi.getAllCoreApps);
};
export const useChiTietDonHang = (productCode: string, option?: any) => {
  return useQuery(
    ['chiTietDonHang', productCode],
    () => donHangApi.findByCode(productCode),
    option
  );
};
export const useChiTietVoucher = (voucherId: string) => {
  return useQuery(['chiTietVoucher', voucherId], () => donHangApi.getOne(voucherId));
};
export const useUpdateDonHang = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(donHangApi.update, {
    onSuccess: () => {
      toast.show('Cập nhật đơn hàng thành công', {
        type: 'success',
        animationType: 'zoom-in',
      });

      queryClient.invalidateQueries('donHangList');
      queryClient.invalidateQueries('chiTietDonHang');
      queryClient.invalidateQueries('donHangCount');
    },
    onError: error => {
      console.log();

      toast.show('Cập nhật đơn hàng thất bại', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    },
  });
};
export const useDonHangCount = () => {
  // const {infoUser} = useAuth();

  const infoUser = useSelector((state: any) => state.userReducer.infoUser);

  return useQuery('donHangCount', () => donHangApi.getCount(infoUser?.email ?? ''), {
    onSuccess: data => {
      Platform.OS === 'ios' && setBadgeCountNoti(data.data?.chuaSuDung ?? 0);
    },
    enabled: !!infoUser?.email,
  });
};
export default donHangApi;
