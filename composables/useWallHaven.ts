import type { UseFetchOptions } from "nuxt/app";
import type {
  Avatar,
  Uploader,
  Thumbs,
  Tag,
  WallpaperDetail,
  SearchParams,
  SearchListingWallpaper,
  SearchResponse,
} from "~/types/wallhaven";

interface Query {
  [key: string]: string | number | boolean | undefined;
}

export function useWallHaven() {
  // 基础 fetch 方法
  const fetchWithBase = async <T = any>(
    endpoint: string,
    options: { query?: Query } = {}
  ) => {
    const config: UseFetchOptions<T> = {
      baseURL: "/api/wallhaven", // Fix the API base URL to match the server endpoint
    };

    return useFetch(endpoint, {
      ...config,
      query: options.query,
    });
  };

  /**
   * 获取壁纸详情
   * @param id 壁纸ID
   */
  const getWallpaperDetail = (id: string) => {
    return fetchWithBase<WallpaperDetail>(`w/${id}`);
  };

  /**
   * 搜索壁纸
   * @param params 搜索参数
   */
  const searchWallpapers = (params?: SearchParams) => {
    return fetchWithBase<SearchResponse>("search", {
      query: {
        // 设置默认值和传入的参数
        sorting: "date_added",
        order: "desc",
        ...params,
      },
    });
  };

  /**
   * 获取标签信息
   * @param id 标签ID
   */
  const getTagInfo = (id: string) => {
    return fetchWithBase<{ data: Tag }>(`tag/${id}`);
  };

  /**
   * 获取用户设置
   */
  const getUserSettings = () => {
    return fetchWithBase<{
      data: {
        thumb_size: string;
        per_page: string;
        purity: string[];
        categories: string[];
        resolutions: string[];
        aspect_ratios: string[];
        toplist_range: string;
        tag_blacklist: string[];
        user_blacklist: string[];
      };
    }>("settings");
  };

  /**
   * 获取用户收藏集
   * @param username 可选的用户名，不传则获取当前用户的收藏集
   */
  const getUserCollections = (username?: string) => {
    const endpoint = username ? `collections/${username}` : "collections";
    return fetchWithBase<{
      data: Array<{
        id: number;
        label: string;
        views: number;
        public: number;
        count: number;
      }>;
    }>(endpoint);
  };

  /**
   * 获取收藏集中的壁纸
   * @param username 用户名
   * @param collectionId 收藏集ID
   */
  const getCollectionWallpapers = (username: string, collectionId: string) => {
    return fetchWithBase<SearchResponse>(
      `collections/${username}/${collectionId}`
    );
  };

  // 实用工具方法
  const buildSearchUrl = (params: SearchParams): string => {
    const searchParams = new URLSearchParams();

    // 添加非空参数
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    return `search?${searchParams.toString()}`;
  };

  return {
    // 主要 API 方法
    getWallpaperDetail,
    searchWallpapers,
    getTagInfo,
    getUserSettings,
    getUserCollections,
    getCollectionWallpapers,

    // 工具方法
    buildSearchUrl,
  };
}
