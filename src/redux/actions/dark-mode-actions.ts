import {types} from '@redux/types/chi-tiet-pyc';

export function setDarkMode(data: any) {
  const newData = data + '' === 'true' ? true : false;
  return {
    type: types.SEND_REQUEST_DARK_MODE,
    payload: newData,
  };
}
export function setDarkModeSuccess(data: any) {
  return {
    type: types.SEND_REQUEST_DARK_MODE_SUCCESS,
    payload: data,
  };
}

export function setDarkModeFailure(error: any) {
  return {
    type: types.SEND_REQUEST_DARK_MODE_FAILURE,
    payload: {},
    error: error,
  };
}
