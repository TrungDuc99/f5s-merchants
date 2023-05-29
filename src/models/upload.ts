export interface FileParams {
  bucket: string;
  page?: number;
  limit?: number;
  search?: string;
  fileType: string;
}
export interface FileItem {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
  url: string;
  name: string;
  owner: string;
}
export interface FileRes {
  data: FileItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
