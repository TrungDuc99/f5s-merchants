export interface TaoTichDiemReq {
  maKh: string;
  point: number;
  discount: number;
  total: number;
  channel: string;
  urlImageBill: string;
}
export interface TichDiemRes {
  maKh: string;
  point: number;
  discount: number;
  total: number;
  channel: string;
  urlImageBill: string;
  id: number;
  createdBy: string;
  created: string;
  lastModifiedBy: string;
  lastModified: string;
}
