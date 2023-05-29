import {types} from '@redux/types/chi-tiet-pyc';

const initialState = {
  loading: false,
  darkMode: false,

  error: {},
};

const darkModeReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case types.SEND_REQUEST_DARK_MODE:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_DARK_MODE_SUCCESS:
      return {
        ...state,
        darkMode: payload,
        loading: false,
      };
    case types.SEND_REQUEST_DARK_MODE_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default darkModeReducer;
