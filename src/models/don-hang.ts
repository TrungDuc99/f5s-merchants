import {TimeStamp} from './common';

export interface DonHang extends TimeStamp {
  // id: number;
  // maKh: string;
  // productName: string;
  // productPrice: number;
  // userName: string;
  // userEmail: string;
  // sanPhamId: number;
  // transactionId: string;
  // code: string;
  // usedTime: string;
  // linkUse: string;
  // status: number;
  // state: number;
  // expiredTime: string;
  // channel: any;
  // customerId: any;
  // customerPhone: string | null;
  // description: string;
  // cuaHangId: number;
  // cuaHangName: string | null;
  // sanPham: any;
  // totalBill: number;
  // totalBillImage: string;
  // createdBy: string;
  // created: string;
  // lastModifiedBy: string;
  // lastModified: string;
  // sdtKh: string;
  // tenKh: string;
  // maHopDong: string;
  sanPham: {
    productCode: string;
    productId: number;
    name: string;
    image: string;
    price: number;
    type: number;
    size: number;
    partner: string;
    brandId: number;
    brandName: string;
    brandLogo: string;
    content: string;
    weight: any;
    term: string;
    status: true;
    branchId: number;
    branchName: string;
    expiredMonth: string;
    usageCheck: number;
    isMonthExpired: boolean;
    monthExpired: number;
    cuaHangSanPhams: any[];
    maSanPhams: any[];
    gotItTransactionResFails: any[];
    gotItTransactionRequests: any[];
    gotItTransactionResponses: any[];
    urboxTransactionRequests: any[];
    urboxTransactionResFails: any[];
    urboxTransactionResponses: any[];
    doiTacGiaoHangSanPhams: any[];
    id: number;
    discount: number;
    createdBy: string;
    created: string;
    lastModifiedBy: string;
    lastModified: string;
  };
  id: number;
  content: string;
  sanPhamId: number;
  transactionId: string;
  code: string;
  usedTime: string;
  linkUse: string;
  status: number;
  state: number;
  expiredTime: string;
  channel: string;
  customerId: string;
  customerPhone: string;
  customerName: string;
  customerEmail: string;
  customerContractCode: string;
  description: string;
  totalBill: number;
  totalBillImage: string;
  discount: number;
  subState: number;
  cuaHangId: number;
  cuaHangName: null;
  thumbnail: string;
  point: number;
  getCodeAt: string;
  productName: string;
  productImage: string;
  image: string;
  productPrice: number;
  userName: string;
  userEmail: string;
  userPhone: string;

  term: string;
}
export interface Voucher {
  voucher: DonHang;
  isKhachHang: boolean;
  khachHang: KhachHang;
}
export interface KhachHang {
  maKh: string;
  maHopDong: string;
  tenKh: string;
  email: string;
  sdtKh: string;
  kenh: string;
}
export interface DonHangCount {
  chuaSuDung: number;
  daSuDung: number;
  daHuy: number;
  daHetHan: number;
}
export interface Voucher extends TimeStamp {
  productCode: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  type: number;
  size: number;
  partner: string;
  brandName: string;
  brandLogo: string;
  cuaHangs: [];
  content: string;
  term: string;
  status: boolean;
  branchId: number;
  branchName: string;
  expiredMonth: boolean;
  usageCheck: string;
  isMonthExpired: boolean;
  monthExpired: number;
  id: number;
}
export interface DonHangUpdateParams {
  email: string;
  id: number;
  state: number;
  totalBill?: number;
  totalBillImage?: string;
}
