import {getInfoUserDetail} from '@redux/apis/get-info-user';
import {getDetailPYC} from '@redux/apis/phieu-yeu-cau';
import {types} from '@redux/types/chi-tiet-pyc';
import {put, takeEvery, call} from 'redux-saga/effects';
function* getPhieuYeuCau({payload, error}: any): any {
  try {
    const detailPYC = yield call(getDetailPYC, payload);

    yield put({
      type: types.SEND_REQUEST_GET_DETAILS_PYC_SUCCESS,
      payload: {id: payload, detailPYC: detailPYC},
    });
  } catch (err) {
    yield put({type: types.SEND_REQUEST_GET_DETAILS_PYC_FAILURE, payload: err});
  }
}
function* getInfoUser({payload, error}: any): any {
  try {
    const detailUser = yield call(getInfoUserDetail);
    yield put({
      type: types.SEND_REQUEST_GET_DETAILS_USER_SUCCESS,
      payload: {infoUser: detailUser},
    });
  } catch (err) {
    yield put({type: types.SEND_REQUEST_GET_DETAILS_USER_FAILURE, payload: err});
  }
}
function* changeDarkMode({payload, error}: any) {
  try {
    yield put({
      type: types.SEND_REQUEST_DARK_MODE_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    yield put({
      type: types.SEND_REQUEST_DARK_MODE_FAILURE,
      payload: {
        error: error,
        message: 'Lỗi không thể chuyển sang chế độ dark mode',
      },
    });
  }
}
export default function* mainSaga() {
  yield takeEvery(types.SEND_REQUEST_GET_DETAILS_PYC, getPhieuYeuCau);
  yield takeEvery(types.SEND_REQUEST_GET_DETAILS_USER, getInfoUser);
  yield takeEvery(types.SEND_REQUEST_DARK_MODE, changeDarkMode);
}
