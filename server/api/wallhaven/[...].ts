import { defineEventHandler, getQuery } from "h3";

const WALLHAVEN_API_URL = "https://wallhaven.cc/api/v1";

// 有效的搜索参数列表
const VALID_SEARCH_PARAMS = [
  "q", // 搜索查询
  "categories", // 类别 100/101/111 etc
  "purity", // 纯度 100/110/111 etc
  "sorting", // 排序方式
  "order", // 排序顺序
  "topRange", // top列表范围
  "atleast", // 最小分辨率
  "resolutions", // 精确分辨率
  "ratios", // 宽高比
  "colors", // 颜色
  "page", // 页码
  "seed", // 随机种子
];

export default defineEventHandler(async (event) => {
  // 获取运行时配置
  const config = useRuntimeConfig();

  // 从路径中提取 API 路径部分
  const path = event.path.replace("/api/wallhaven/", "");

  // 获取查询参数
  const query = getQuery(event);

  // 构建请求 URL
  const url = new URL(`${WALLHAVEN_API_URL}/${path}`);

  // 如果有API key则添加，但不是必需的
  if (config.wallhavenApiKey) {
    url.searchParams.append("apikey", config.wallhavenApiKey);
  }

  // 添加其他查询参数
  Object.entries(query).forEach(([key, value]) => {
    // 对于搜索接口，只添加有效的搜索参数
    if (path === "search") {
      if (VALID_SEARCH_PARAMS.includes(key) && value) {
        url.searchParams.append(key, value.toString());
      }
    } else {
      // 对于其他接口，添加所有非空参数
      if (value) {
        url.searchParams.append(key, value.toString());
      }
    }
  });

  try {
    console.log("Requesting URL:", url.toString());
    const response = await fetch(url);

    if (!response.ok) {
      // 处理特定的错误状态
      if (response.status === 429) {
        throw createError({
          statusCode: 429,
          statusMessage: "Rate limit exceeded. Please try again later.",
        });
      }
      if (response.status === 401) {
        throw createError({
          statusCode: 401,
          statusMessage:
            "Unauthorized. Invalid API key or insufficient permissions.",
        });
      }
      throw createError({
        statusCode: response.status,
        statusMessage: `Wallhaven API error: ${response.status}`,
      });
    }

    return await response.json();
  } catch (error) {
    // Type guard to check if error is an object with statusCode
    if (error instanceof Error) {
      // Handle standard Error objects
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Error fetching from Wallhaven API",
        data: error,
      });
    }

    // Check if error is an object with statusCode property
    if (typeof error === "object" && error !== null && "statusCode" in error) {
      throw error; // Rethrow if it's an error with statusCode
    }

    // Fallback for any other unexpected error types
    throw createError({
      statusCode: 500,
      statusMessage:
        "Unexpected error occurred while fetching from Wallhaven API",
      data: error,
    });
  }
});
