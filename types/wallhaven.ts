// 通用类型
export interface Avatar {
  "200px": string;
  "128px": string;
  "32px": string;
  "20px": string;
}

export interface Uploader {
  username: string;
  group: string;
  avatar: Avatar;
}

export interface Thumbs {
  large: string;
  original: string;
  small: string;
}

export interface Tag {
  id: number;
  name: string;
  alias: string;
  category_id: number;
  category: string;
  purity: string;
  created_at: string;
}

// 壁纸详情相关类型
export interface WallpaperDetail {
  data: {
    id: string;
    url: string;
    short_url: string;
    uploader: Uploader;
    views: number;
    favorites: number;
    source: string;
    purity: "sfw" | "sketchy" | "nsfw";
    category: "general" | "anime" | "people";
    dimension_x: number;
    dimension_y: number;
    resolution: string;
    ratio: string;
    file_size: number;
    file_type: string;
    created_at: string;
    colors: string[];
    path: string;
    thumbs: Thumbs;
    tags: Tag[];
  };
}

// 搜索列表相关类型
export interface SearchParams {
  q?: string; // 搜索查询
  categories?: string; // 100/101/111 etc
  purity?: string; // 100/110/111 etc
  sorting?:
    | "date_added"
    | "relevance"
    | "random"
    | "views"
    | "favorites"
    | "toplist";
  order?: "desc" | "asc";
  topRange?: "1d" | "3d" | "1w" | "1M" | "3M" | "6M" | "1y";
  atleast?: string; // 最小分辨率
  resolutions?: string; // 精确分辨率列表
  ratios?: string; // 宽高比列表
  colors?: string; // 颜色
  page?: number; // 页码
  seed?: string; // 随机结果的种子
}

export interface SearchListingWallpaper {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: "sfw" | "sketchy" | "nsfw";
  category: "general" | "anime" | "people";
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: Thumbs;
}

export interface SearchResponse {
  data: SearchListingWallpaper[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    query:
      | string
      | null
      | {
          id: number;
          tag: string;
        };
    seed?: string;
  };
}

// Image Item Type for Waterfall Flow Component
export interface ImageItem {
  id: number | string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}
