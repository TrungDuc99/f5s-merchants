import {types} from '@redux/types/chi-tiet-pyc';

const initialState = {
  loading: false,
  phieuYeuCau: {},
  id: undefined,
  error: {},
};

const phieuYeuCauReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case types.SEND_REQUEST_GET_DETAILS_PYC:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_DETAILS_PYC_SUCCESS:
      return {
        ...state,
        id: payload.id,
        phieuYeuCau: payload.detailPYC,
        loading: false,
      };
    case types.SEND_REQUEST_GET_DETAILS_PYC_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default phieuYeuCauReducer;
