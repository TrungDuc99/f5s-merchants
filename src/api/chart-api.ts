import {useAuth} from '@core';
import {Chart, ChartReq} from '@models/chart';
import {useQuery} from 'react-query';
import {ResponseData, ResultData} from '../models/common';
import axiosClient from './axios-client';

const chartApi = {
  getChart: (
    fromDate: string | undefined,
    toDate: string | undefined,
    userId: string | number
  ): Promise<ResponseData<ResultData<Chart>>> => {
    const url = `/DonHang/giaodich-theongay?NgayBatDau=${fromDate || ''}&NgayKetThuc=${
      toDate || ''
    }&userId=${userId || ''}`;
    return axiosClient.get(url);
  },
};
export const useGetChart = (fromDate: string, toDate: string) => {
  const {infoUser} = useAuth();

  return useQuery(['getChart', fromDate, toDate], () =>
    chartApi.getChart(fromDate, toDate, infoUser?.id ?? '')
  );
};
export default chartApi;
