import accountApi from '@api/account-api';

export const getInfoUserDetail = async () => {
  try {
    const res = await accountApi.getInfoUser();
    const detailInfoUser = res;
    return detailInfoUser;
  } catch (err) {
    return console.error(err);
  }
};
