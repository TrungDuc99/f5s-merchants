import {Customer} from '@models/hop-dong';
import {useQuery} from 'react-query';
import {ResponseData} from '../models/common';
import axiosBshClient from './axios-bsh-client';

const hopDongApi = {
  getDetail: (customerId: any): Promise<ResponseData<Customer>> => {
    const url = `/hopdong/customer-info?customerId=${customerId}`;
    return axiosBshClient.get(url);
  },
};
export const useCustomerDetail = (customerId: string) => {
  return useQuery(['chiTietDonHang', customerId], () => hopDongApi.getDetail(customerId));
};
export default hopDongApi;
