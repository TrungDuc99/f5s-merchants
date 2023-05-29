import {types} from '@redux/types/chi-tiet-pyc';

export function fetchUserDetail(data?: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_USER,
    payload: data,
  };
}

export function fetchDataUserSuccess(data: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_USER_SUCCESS,
    payload: data,
  };
}
export function fetchDataUserFailure(error: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_USER_FAILURE,
    payload: {},
    error: error,
  };
}
export function clearDataUserUser(data: any) {
  return {
    type: types.SEND_REQUEST_DELETE_USER,
    payload: data,
  };
}

export function clearDataUserSuccess(data: any) {
  return {
    type: types.SEND_REQUEST_DELETE_USER_SUCCESS,
    payload: data,
  };
}
export function clearDataUserFailure(error: any) {
  return {
    type: types.SEND_REQUEST_DELETE_USER_FAILURE,
    payload: {},
    error: error,
  };
}
export function logOutHandle() {
  return {
    type: types.LOGOUT_HANDLER,
  };
}
