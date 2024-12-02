import { defineEventHandler, getQuery, createError } from 'h3'

const PEXELS_API_URL = 'https://api.pexels.com/v1'
const PEXELS_VIDEO_API_URL = 'https://api.pexels.com/videos'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  if (!config.pexelsApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Pexels API key is not configured',
    })
  }

  // 获取路径参数
  const path = event.path.replace('/api/pexels/', '')
  
  // 获取查询参数
  const query = getQuery(event)
  
  // 确定基础URL
  const isVideoEndpoint = path.startsWith('videos')
  const baseUrl = isVideoEndpoint ? PEXELS_VIDEO_API_URL : PEXELS_API_URL
  
  // 构建请求URL
  const url = new URL(`${baseUrl}/${path}`)
  
  // 添加查询参数
  Object.entries(query).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value.toString())
  })

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': config.pexelsApiKey
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw createError({
        statusCode: response.status,
        statusMessage: `Pexels API error: ${response.statusText}`,
        data: errorData
      })
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching from Pexels API',
        data: {
          message: error.message,
          name: error.name
        }
      })
    }

    // Handle cases where error is not an Error instance
    throw createError({
      statusCode: 500,
      statusMessage: 'Unknown error occurred while fetching from Pexels API',
      data: error
    })
  }
})
