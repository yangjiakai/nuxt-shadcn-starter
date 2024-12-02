// 基础照片类型
export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PhotoSources;
    liked: boolean;
    alt: string;
  }
  
  // 照片不同尺寸源
  export interface PhotoSources {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  }
  
  // 搜索照片的响应
  export interface PhotoSearchResponse {
    total_results: number;
    page: number;
    per_page: number;
    photos: Photo[];
    next_page?: string;
    prev_page?: string;
  }
  
  // 搜索照片的查询参数
  export interface PhotoSearchParams {
    query: string;
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'large' | 'medium' | 'small';
    color?: string;
    locale?: string;
    page?: number;
    per_page?: number;
  }
  
  // 精选照片的响应
  export  interface CuratedPhotosResponse {
    total_results: number;
    page: number;
    per_page: number;
    photos: Photo[];
    next_page?: string;
    prev_page?: string;
  }
  
  // 获取单张照片的响应
  type GetPhotoResponse = Photo;
  
  // API 错误响应
  interface PexelsError {
    error: string;
    status: number;
  }
  
  // API 请求头
  interface PexelsHeaders {
    Authorization: string;
  }
  
  // 分页参数
  interface PaginationParams {
    page?: number;
    per_page?: number;
  }