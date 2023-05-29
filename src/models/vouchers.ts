import {TimeStamp} from './common';

export interface Voucher extends TimeStamp {
  // productCode: string;
  // productId: number;
  // name: string;
  // image: string;
  // price: number;
  // type: number;
  // size: number;
  // partner: string;
  // brandName: string;
  // brandLogo: string;
  // cuaHangs: [];
  // content: string;
  // term: string;
  // status: boolean;
  // branchId: number;
  // branchName: string;
  // expiredMonth: boolean;
  // usageCheck: string;
  // isMonthExpired: boolean;
  // monthExpired: number;
  // id: number;

  id: number;
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
  status: boolean;
  branchId: number;
  branchName: string;
  expiredMonth: string;
  isMonthExpired: boolean;
  monthExpired: number;
  weight: any;

  // id: number;

  // sanPhamId: number;
  // transactionId: string;
  // code: string;
  // usedTime: string;
  // linkUse: string;
  // status: number;
  // state: number;
  // expiredTime: string;
  // channel: string;
  // customerId: string;
  // customerPhone: string;
  // customerName: string;
  // customerEmail: string;
  // customerContractCode: string;
  // description: string;
  // totalBill: number;
  // totalBillImage: string;
  // discount: number;
  // subState: number;
  // cuaHangId: number;
  // cuaHangName: null;
  // thumbnail: string;
  // point: number;
  // content: string;
  // getCodeAt: string;
  // productName: string;
  // productImage: string;
  // productPrice: number;
  // userName: string;
  // userEmail: string;
  // userPhone: string;
}

export interface VoucherUpdateParams {
  id: number;
  state: number;
}
