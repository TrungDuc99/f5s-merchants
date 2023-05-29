import {TimeStamp} from './../../.history/src/models/common_20220817165154';
export interface Customer extends TimeStamp {
  id: number;

  maHopDong: string;
  point: number;
  pointF5s: number;
  pointChietKhau: number;
  pointTichDiem: number;
  maNv: string;
  tenKh: string;
  sdtKh: string;
  avatar: string;
  email: string;
  maKh: string;
  passwordHash: string;
  xepHangId: number;
  tenHang: string;
  imageHang: string;
}
