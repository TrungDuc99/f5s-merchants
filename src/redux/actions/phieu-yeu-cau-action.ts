import {types} from '@redux/types/chi-tiet-pyc';

export function fetchPhieuYeuCauDetail(data: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_PYC,
    payload: data,
  };
}
export function fetchDataSuccess(data: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_PYC_SUCCESS,
    payload: data,
  };
}
export function fetchDataFailure(error: any) {
  return {
    type: types.SEND_REQUEST_GET_DETAILS_PYC_FAILURE,
    payload: {},
    error: error,
  };
}
