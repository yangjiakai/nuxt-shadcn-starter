import { ref } from 'vue'
import type { UseFetchOptions } from 'nuxt/app'

// 定义查询参数接口
interface Query {
  [key: string]: string | number | boolean | undefined
}

// 定义分页参数接口
interface PaginationQuery {
  page?: number
  per_page?: number
}

// 定义方向参数接口
interface OrientationQuery {
  orientation?: 'landscape' | 'portrait' | 'square'
}

// 定义大小参数接口
interface SizeQuery {
  size?: 'large' | 'medium' | 'small'
}

// 定义颜色参数接口
interface ColorQuery {
  color?: string  // Hex color without '#' or color name
}

// 定义本地化参数接口
interface LocaleQuery {
  locale?: 'en-US' | 'pt-BR' | 'es-ES' | 'ca-ES' | 'de-DE' | 'it-IT' | 'fr-FR' | 'sv-SE' | 'id-ID' | 'pl-PL' | 'ja-JP' | 'zh-TW' | 'zh-CN' | 'ko-KR' | 'th-TH' | 'nl-NL' | 'hu-HU' | 'vi-VN' | 'cs-CZ' | 'da-DK' | 'fi-FI' | 'uk-UA' | 'el-GR' | 'ro-RO' | 'nb-NO' | 'sk-SK' | 'tr-TR' | 'ru-RU'
}

// 定义 Pexels 照片接口
export interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

// 定义 Pexels 视频接口
export interface PexelsVideo {
  id: number
  width: number
  height: number
  url: string
  image: string
  duration: number
  user: {
    id: number
    name: string
    url: string
  }
  video_files: Array<{
    id: number
    quality: string
    file_type: string
    width: number
    height: number
    link: string
  }>
  video_pictures: Array<{
    id: number
    picture: string
    nr: number
  }>
}

// 定义 Pexels 收藏集接口
export interface PexelsCollection {
  id: string
  title: string
  description: string | null
  private: boolean
  media_count: number
  photos_count: number
  videos_count: number
}

export function usePixcels() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 基础 fetch 方法
  const fetchWithBase = async (endpoint: string, options: { query?: Query } = {}) => {
    const config: UseFetchOptions<any> = {
      baseURL: '/api/pexels',
    }
    
    try {
      const { data, error: fetchError } = await useFetch(endpoint, {
        ...config,
        query: options.query,
      })
      
      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Request failed')
      }
      
      return data.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,

    // Photos
    getPhotos: (query?: Query & PaginationQuery) => 
      fetchWithBase('curated', { query }),
    
    getPhoto: (id: string) => 
      fetchWithBase(`photos/${id}`),
    
    searchPhotos: (query: Query & PaginationQuery & OrientationQuery & SizeQuery & ColorQuery & LocaleQuery & {
      query: string
    }) => fetchWithBase('search', { query }),

    // Videos
    getPopularVideos: (query?: Query & PaginationQuery & {
      min_width?: number
      min_height?: number
      min_duration?: number
      max_duration?: number
    }) => fetchWithBase('videos/popular', { query }),

    getVideo: (id: string) => 
      fetchWithBase(`videos/${id}`),
    
    searchVideos: (query: Query & PaginationQuery & {
      query: string
      orientation?: 'landscape' | 'portrait' | 'square'
      size?: 'large' | 'medium' | 'small'
      locale?: string
    }) => fetchWithBase('videos/search', { query }),

    // Collections
    getFeaturedCollections: (query?: Query & PaginationQuery) => 
      fetchWithBase('collections/featured', { query }),
    
    getCollection: (id: string) => 
      fetchWithBase(`collections/${id}`),
    
    getCollectionMedia: (id: string, query?: Query & PaginationQuery & {
      type?: 'photos' | 'videos'
    }) => fetchWithBase(`collections/${id}`, { query }),

    // Additional Endpoints
    getColorPalette: (query: { image_url: string }) =>
      fetchWithBase('colors/extract', { query })
  }
}
