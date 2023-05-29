import {useAuth} from '@core';
import {
  AuthenticateReq,
  AuthenticateRes,
  InfoQRLoginRes,
  InfoUserRes,
  PasswordChangeReq,
  ResponseData,
} from '@models';
import {showSuccessMessage} from '@utils';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axiosClient from './axios-client';
('');
const accountApi = {
  authenticate: (data: AuthenticateReq): Promise<ResponseData<AuthenticateRes>> => {
    const url = '/account/authenticate';
    return axiosClient.post(url, data);
  },
  getInfoUser: (): Promise<InfoUserRes> => {
    const url = '/account/me';
    return axiosClient.get(url);
  },
  changePassword: (data: Partial<PasswordChangeReq>): Promise<any> => {
    const url = '/account/change-password';
    return axiosClient.post(url, data);
  },
  authenticateQR: (data: {code: string}): Promise<ResponseData<InfoQRLoginRes>> => {
    const url = `/account/quet-ma-dang-nhap?code=${data.code}`;
    return axiosClient.get(url);
  },
  authenticateQRConfirm: (data: {
    connectionId: string;
    status: boolean;
  }): Promise<ResponseData<any>> => {
    const url = '/account/dang-nhap-qrcode';
    return axiosClient.post(url, data);
  },
  changePasswordForget: (
    data: Partial<{
      phone: number;
      confirmPassword: string;
      confirmNewPassword: string;
    }>
  ): Promise<any> => {
    const url = '/account/forgot-password';
    return axiosClient.post(url, data);
  },
  checkPhoneNumber: (phoneNumber: number): Promise<any> => {
    const url = `/account/check-phoneNumber?phoneNumber=${phoneNumber + ''}`;
    return axiosClient.get(url);
  },
  update: (id: string, data: Partial<any>): Promise<any> => {
    const url = `/account/cap-nhat-user/${id}`;
    return axiosClient.put(url, data);
  },
};

export const useAuthenticate = () => {
  return useMutation(accountApi.authenticate);
};

export const useAuthenticateQR = () => {
  return useMutation(accountApi.authenticateQR);
};
export const useAuthenticateQRConfirm = () => {
  return useMutation(accountApi.authenticateQRConfirm);
};
export const useChangePassword = () => {
  const {signOut} = useAuth();

  return useMutation(accountApi.changePassword, {
    onSuccess: () => {
      showSuccessMessage('Cập nhật mật khẩu thành công');
      signOut();
    },
  });
};
export const useChangePasswordForget = () => {
  return useMutation(accountApi.changePasswordForget, {
    onSuccess: () => {
      showSuccessMessage('Cập nhật mật khẩu thành công');
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({id, data}: {id: string; data: Partial<any>}) => accountApi.update(id, data),
    {
      onSuccess: () => {
        showSuccessMessage('Cập nhật thông tin thành công');
        queryClient.invalidateQueries('infoUser');
      },
    }
  );
};
export const useInfoUser = () => {
  const {setInfoUser} = useAuth();
  return useQuery('infoUser', accountApi.getInfoUser, {
    onSuccess: data => {
      setInfoUser(data);
    },
  });
};
export const useCheckPhoneNumber = () => {
  return useMutation(
    ({phoneNumber}: {phoneNumber: number}) => accountApi.checkPhoneNumber(phoneNumber),
    {
      onSuccess(data, variables, context) {},
      onError(error, variables, context) {},
    }
  );
};
export default accountApi;
