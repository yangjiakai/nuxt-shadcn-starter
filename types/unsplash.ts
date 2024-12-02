// types/unsplash.ts
export interface RandomPhotoParams {
    count?: number
    query?: string
    orientation?: 'landscape' | 'portrait' | 'squarish'
    collections?: string
    topics?: string
    content_filter?: 'low' | 'high'
  }
  