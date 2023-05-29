/// Auth.tsx
import {InfoUserRes} from '@models';
import create from 'zustand';
import * as Keychain from 'react-native-keychain';
import SInfo from 'react-native-sensitive-info';
import {
  getToken,
  setToken,
  removeToken,
  TokenType,
  setRemember,
  RememberType,
  getRemember,
  removeRemember,
  setEmail,
  setPhoneNumber,
  setPassword,
  getEmail,
} from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  infoUser: InfoUserRes | null;
  signIn: (
    data: TokenType,
    remember: RememberType,
    phoneNumber?: string,
    password?: string
  ) => void;
  signOut: () => void;
  hydrate: () => void;
  setInfoUser: (infoUser: InfoUserRes) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  infoUser: null,
  setInfoUser: (infoUser: InfoUserRes) => {
    set({infoUser});
  },
  signIn: (token, remember, phoneNumber, password) => {
    setToken(token);
    setRemember(remember);
    set({status: 'signIn', token});
    if (phoneNumber && password) {
      setPhoneNumber(phoneNumber);

      setPassword(password);
      Keychain.setGenericPassword(phoneNumber, password);
      SInfo.setItem('accessToken', token.access, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
    }
  },
  signOut: () => {
    removeToken();
    removeRemember();
    set({status: 'signOut', token: null});
    Keychain.resetGenericPassword();
    SInfo.deleteItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
  },
  hydrate: () => {
    try {
      const userToken = getToken();

      const remember = getRemember();

      if (userToken !== null && remember !== null) {
        get().signIn(userToken, remember);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const signOut = () => useAuth.getState().signOut();
export const hydrateAuth = () => useAuth.getState().hydrate();
