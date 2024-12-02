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

export function useUnsplash() {
  // 基础 fetch 方法
  const fetchWithBase = async (endpoint: string, options: { query?: Query } = {}) => {
    const config: UseFetchOptions<any> = {
      baseURL: '/api/unsplash',
    }
    
    return await useFetch(endpoint, {
      ...config,
      query: options.query,
    })
  }

  return {
    // Photos
    getPhotos: (query?: Query & PaginationQuery) => 
      fetchWithBase('photos', { query }),
    
    getPhoto: (id: string) => 
      fetchWithBase(`photos/${id}`),
    
    getRandomPhoto: (query?: Query & {
      collections?: string
      topics?: string
      username?: string
      query?: string
      orientation?: 'landscape' | 'portrait' | 'squarish'
      content_filter?: 'low' | 'high'
      count?: number
    }) => fetchWithBase('photos/random', { query }),
    
    // Topics
    getTopics: (query?: Query & {
      ids?: string
      order_by?: 'featured' | 'latest' | 'oldest' | 'position'
    } & PaginationQuery) => fetchWithBase('topics', { query }),
    
    getTopic: (idOrSlug: string) => 
      fetchWithBase(`topics/${idOrSlug}`),
    
    getTopicPhotos: (idOrSlug: string, query?: Query & PaginationQuery & {
      orientation?: 'landscape' | 'portrait' | 'squarish'
    }) => fetchWithBase(`topics/${idOrSlug}/photos`, { query }),
    
    // Collections 
    getCollections: (query?: Query & PaginationQuery) => 
      fetchWithBase('collections', { query }),
    
    getCollection: (id: string) => 
      fetchWithBase(`collections/${id}`),
    
    getCollectionPhotos: (id: string, query?: Query & PaginationQuery & {
      orientation?: 'landscape' | 'portrait' | 'squarish'
    }) => fetchWithBase(`collections/${id}/photos`, { query }),
    
    // Search
    searchPhotos: (query: Query & {
      query: string
      page?: number
      per_page?: number
      order_by?: 'relevant' | 'latest'
      collections?: string
      content_filter?: 'low' | 'high'
      color?: string
      orientation?: 'landscape' | 'portrait' | 'squarish'
    }) => fetchWithBase('search/photos', { query }),
    
    searchCollections: (query: Query & {
      query: string
      page?: number
      per_page?: number
    }) => fetchWithBase('search/collections', { query })
  }
}
