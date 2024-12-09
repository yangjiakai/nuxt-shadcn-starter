import { defineEventHandler, getQuery } from "h3";

const UNSPLASH_API_URL = "https://api.unsplash.com";

const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  // 获取路径参数
  const path = event.path.replace("/api/unsplash/", "");

  // 获取查询参数
  const query = getQuery(event);

  // 构建请求URL
  const url = new URL(`${UNSPLASH_API_URL}/${path}`);

  // 添加查询参数
  Object.entries(query).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value.toString());
  });

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${config.unsplashApiKey}`,
        "Accept-Version": "v1",
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching from Unsplash API",
      data: error,
    });
  }
});
