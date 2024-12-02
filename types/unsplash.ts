// types/unsplash.ts
export interface RandomPhotoParams {
  count?: number
  query?: string
  orientation?: 'landscape' | 'portrait' | 'squarish'
  collections?: string
  topics?: string
  content_filter?: 'low' | 'high'
}

export interface Topic {
  id: string
  slug: string
  title: string
  description?: string
  published_at: string
  updated_at: string
  total_photos: number
  links: {
    self: string
    html: string
    photos: string
  }
  status: string
  owners?: Array<{
    id: string
    username: string
  }>
}

export interface UnsplashPhoto {
  id: string
  width: number
  height: number
  description: string | null
  alt_description: string | null
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}