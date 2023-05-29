import {PasswordChangeReq} from '@models';
import {showSuccessMessage} from '@utils';
import {useMutation, useQueryClient} from 'react-query';
import axiosClientVerify from './axios-client-verify';
import CryptoJS from 'react-native-crypto-js';
type Verify = {phone_number: string; channel: string};
type VerifyCode = {phone_number: string; otp: string};
const forGetPasswordApi = {
  sendVerify: (data: Verify): Promise<any> => {
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      '394812730425442A472D2F423F452848'
    ).toString();
    const url = '/mt';
    return axiosClientVerify.post(url, {data: ciphertext});
  },
  verifyCode: (data: VerifyCode): Promise<any> => {
    const url = `/mt/verify`;
    return axiosClientVerify.post(url, data);
  },
};
export const useSendVerify = () => {
  return useMutation(({data}: {data: Verify}) => forGetPasswordApi.sendVerify(data), {
    onSuccess: () => {
      showSuccessMessage('Gửi yêu cầu thành công');
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
};
export const useSendVerifyCode = () => {
  return useMutation(({data}: {data: VerifyCode}) => forGetPasswordApi.verifyCode(data), {
    onSuccess: () => {
      showSuccessMessage('Gửi yêu cầu thành công');
    },
    onError(error, variables, context) {},
  });
};
export default forGetPasswordApi;
