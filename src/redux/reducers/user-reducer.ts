import {types} from '@redux/types/chi-tiet-pyc';

const initialState = {
  loading: false,
  infoUser: {},
  error: {},
};

const userReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case types.SEND_REQUEST_GET_DETAILS_USER:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_DETAILS_USER_SUCCESS:
      return {
        ...state,
        infoUser: payload.infoUser,
        loading: false,
      };
    case types.SEND_REQUEST_GET_DETAILS_USER_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.LOGOUT_HANDLER:
      return {
        ...initialState,
      };

    case types.SEND_REQUEST_DELETE_USER:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.SEND_REQUEST_DELETE_USER_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default userReducer;
