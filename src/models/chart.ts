export interface Chart {
  ngay: string;
  chuaSuDung: number;
  daSuDung: number;
  huy: number;
  hetHan: number;
}

export interface ChartReq {
  fromDate: string | undefined;
  toDate: string | undefined;
}
