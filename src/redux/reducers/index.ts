import {combineReducers} from 'redux';
import darkModeReducer from './dark-mode-reducer';
import phieuYeuCauReducer from './phieu-yeu-cau-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  phieuYeuCauReducer: phieuYeuCauReducer,
  userReducer: userReducer,
  darkModeReducer: darkModeReducer,
});
