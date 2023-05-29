import {TimeStamp} from './common';
export interface AuthenticateRes {
  id: string;
  userName: string;
  email: string;
  roles: Array<string>;
  isVerified: true;
  jwToken: string;
  refreshToken: string;
  userClaims: any;
}

export interface AuthenticateReq {
  // email: string;
  phoneNumber: string;
  password: string;
  deviceToken: string;
}

export interface InfoUserRes {
  id: string;
  email: string;
  username: string;
  tenNhanVien: string;
  soDienThoai: string;
  ngaySinh: Date | string;
  gioiTinh: any;
  result: boolean;
  role: string[];
  roleClaim: string[];
}
export interface PasswordChangeReq {
  email: string;
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
}
export interface InfoQRLoginRes extends TimeStamp {
  connectionId: string;
  phoneNumber: string;
  duongDanAnhDaiDien: string;
  channel: string;
  code: string;
  thietBi: string;
  trinhDuyet: string;
  timeExpired: string;
  id: number;
}
