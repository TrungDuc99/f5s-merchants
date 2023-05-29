import {MMKV} from 'react-native-mmkv';

const TOKEN = 'token';
const REMEMBER = 'remember';
const PASSWORD = 'password';
const EMAIL = 'email';
const PHONENUMBER = 'phoneNumber';
const storage = new MMKV();

export type TokenType = {
  access: string;
  refresh?: string;
};
export type RememberType = boolean;
export type EmailType = string;
export type PhoneNumberType = string;
export type PasswordType = string;
export function getItem<T>(key: string): T {
  const value = storage.getString(key);

  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}
export async function removeItem(key: string) {
  storage.delete(key);
}

export const getRemember = () => getItem<RememberType>(REMEMBER);
export const removeRemember = () => removeItem(REMEMBER);
export const setRemember = (value: RememberType) => setItem<RememberType>(REMEMBER, value);

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getEmail = () => getItem<EmailType>(EMAIL);
export const removeEmail = () => removeItem(EMAIL);
export const setEmail = (value: EmailType) => setItem<EmailType>(EMAIL, value);

export const getPassword = () => getItem<PasswordType>(PASSWORD);
export const removePassword = () => removeItem(PASSWORD);
export const setPassword = (value: PasswordType) => setItem<PasswordType>(PASSWORD, value);

export const getPhoneNumber = () => getItem<PhoneNumberType>(PHONENUMBER);
export const removePhoneNumber = () => removeItem(PHONENUMBER);
export const setPhoneNumber = (value: PhoneNumberType) =>
  setItem<PhoneNumberType>(PHONENUMBER, value);
