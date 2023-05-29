export interface ResponseData<T> {
  data: T;
  code: number;
  errors: string[] | null;
  succeeded: boolean;
  message: string;
}
export interface Response {
  Data: any;
  Code: number;
  Errors: string[] | null;
  Succeeded: boolean;
  Message: string;
}

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ResultData<T> extends PaginationParams {
  data: T[];
}
export interface QueryParams {
  search?: string;
  pageNumber?: number | string;
  pageSize?: number | string;
  [x: string]: any;
}
export interface TimeStamp {
  createBy?: any;
  created?: string;
  lastModifiedBy?: any;
  lastModified?: any;
}
export type PathParams = {
  loaiChuSoHuu?: string;
  trangThai?: string;
  loaiTaiSan?: string;
  idTaiSan?: string;
  idPhieuYeuCau?: string;
  loaiMMTB?: string;
  thongTinPTVT?: string;
  thaoTac?: string;
  idHoSo?: string;
};

export interface DinhKem extends TimeStamp {
  id: number;
  ten: string;
  ptvtSoSanhId?: number;
  mmtbSoSanhId?: number;
  moTa: string;
  duongDan: string;
  duongDanXoa: string;
  loai: string;
  trangThai: boolean;
}

export interface DefaultFile {
  path?: string;
  base64?: string;
  width?: number;
  height?: number;
  size?: number;
  name?: string;
  type?: string;
}
