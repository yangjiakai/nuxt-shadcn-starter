<script setup lang="ts">
import Waterfallflow from "~/components/common/WaterfallFlow.vue";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Label } from "~/components/ui/label";
import { useDebounceFn } from "@vueuse/core";

import type {
  SearchParams,
  SearchResponse,
  ImageItem,
} from "~/types/wallhaven";

definePageMeta({
  layout: "gallery",
});

const { searchWallpapers } = useWallHaven();

// 搜索参数
const searchParams = ref<SearchParams>({
  q: "",
  categories: "101",
  purity: "",
  sorting: "date_added",
  order: "desc",
  page: 1,
  atleast: "",
  resolutions: "",
  ratios: "",
  colors: "",
  seed: "",
  topRange: "1d",
});

// 状态管理
const allWallpapers = ref<ImageItem[]>([]);
const hasMore = ref(true);

// 执行搜索
const performSearch = async (params: SearchParams) => {
  const result = await searchWallpapers(params);
  if (result.data.value) {
    if (params.page === 1) {
      allWallpapers.value = wallPapersMapper(result.data.value.data);
    } else {
      allWallpapers.value = [
        ...allWallpapers.value,
        ...wallPapersMapper(result.data.value.data),
      ];
    }
    hasMore.value = result.data.value.data.length > 0;
  }
  return result;
};

// 初始化搜索
const {
  data: searchResult,
  status,
  error,
  refresh,
} = await useAsyncData("wallpapers", () => performSearch(searchParams.value), {
  immediate: true,
  watch: [searchParams],
});

// 数据映射函数
function wallPapersMapper(data: any[]): ImageItem[] {
  return data.map((wallpaper): ImageItem => {
    return {
      id: wallpaper.id,
      url: wallpaper.thumbs.small,
      title: wallpaper.id,
      description: wallpaper.path,
      width: wallpaper.dimension_x,
      height: wallpaper.dimension_y,
    };
  });
}

const isLoading = computed(() => status.value === "pending");

// 加载更多
const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return;

  try {
    searchParams.value.page++;
    await refresh();
  } catch (err) {
    console.error("Error loading more wallpapers:", err);
    searchParams.value.page--;
    hasMore.value = false;
  }
};

// 重置搜索参数
const resetSearchParams = () => {
  searchParams.value = {
    q: "",
    categories: "101",
    purity: "",
    sorting: "date_added",
    order: "desc",
    page: 1,
    atleast: "",
    resolutions: "",
    ratios: "",
    colors: "",
    seed: "",
    topRange: "1d",
  };
  allWallpapers.value = [];
  hasMore.value = true;
  refresh();
};

// 处理筛选条件变化
const handleFilterChange = () => {
  searchParams.value.page = 1;
  allWallpapers.value = [];
  hasMore.value = true;
  refresh();
};

// 防抖处理
const debouncedSearch = useDebounceFn(() => {
  searchParams.value.page = 1;
  allWallpapers.value = [];
  hasMore.value = true;
  refresh();
}, 500);

// 监听搜索参数变化
watch(
  () => searchParams.value.q,
  () => {
    debouncedSearch();
  }
);
</script>

<template>
  <div class="container p-8">
    <!-- Search Panel -->
    <div
      class="bg-white-50 dark:bg-gray-900 rounded-lg p-2 shadow-sm border mb-5"
    >
      <!-- Filters Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2">
        <!-- Search Input -->
        <div class="relative">
          <Input
            v-model="searchParams.q"
            placeholder="搜索图片..."
            class="pl-9 border border-dashed"
            type="text"
          />
          <Icon
            name="heroicons:magnifying-glass"
            class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>

        <!-- Categories Filter -->
        <Select
          v-model="searchParams.categories"
          @update:modelValue="handleFilterChange"
        >
          <SelectTrigger class="bg-background/50 border-dashed">
            <Icon
              name="heroicons:squares-2x2"
              class="w-4 h-4 mr-2 text-muted-foreground"
            />
            <SelectValue placeholder="选择类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">普通</SelectItem>
            <SelectItem value="101">动漫</SelectItem>
            <SelectItem value="111">人物</SelectItem>
          </SelectContent>
        </Select>

        <!-- Content Rating Filter -->
        <Select
          v-model="searchParams.purity"
          @update:modelValue="handleFilterChange"
        >
          <SelectTrigger class="bg-background/50 border-dashed">
            <Icon
              name="heroicons:shield-check"
              class="w-4 h-4 mr-2 text-muted-foreground"
            />
            <SelectValue placeholder="内容分级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">安全</SelectItem>
            <SelectItem value="110">温和</SelectItem>
            <SelectItem value="111">成人</SelectItem>
          </SelectContent>
        </Select>

        <!-- Sorting Filter -->
        <Select
          v-model="searchParams.sorting"
          @update:modelValue="handleFilterChange"
        >
          <SelectTrigger class="bg-background/50 border-dashed">
            <Icon
              name="heroicons:bars-arrow-down"
              class="w-4 h-4 mr-2 text-muted-foreground"
            />
            <SelectValue placeholder="排序方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_added">最新上传</SelectItem>
            <SelectItem value="relevance">相关度</SelectItem>
            <SelectItem value="random">随机</SelectItem>
            <SelectItem value="views">浏览量</SelectItem>
            <SelectItem value="favorites">收藏数</SelectItem>
            <SelectItem value="toplist">热门榜单</SelectItem>
          </SelectContent>
        </Select>

        <!-- Order Filter -->
        <Select
          v-model="searchParams.order"
          @update:modelValue="handleFilterChange"
        >
          <SelectTrigger class="bg-background/50 border-dashed">
            <Icon
              name="heroicons:arrows-up-down"
              class="w-4 h-4 mr-2 text-muted-foreground"
            />
            <SelectValue placeholder="排序顺序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">降序</SelectItem>
            <SelectItem value="asc">升序</SelectItem>
          </SelectContent>
        </Select>

        <!-- Top Range Filter -->
        <Select
          v-model="searchParams.topRange"
          @update:modelValue="handleFilterChange"
        >
          <SelectTrigger class="bg-background/50 border-dashed">
            <Icon
              name="heroicons:clock"
              class="w-4 h-4 mr-2 text-muted-foreground"
            />
            <SelectValue placeholder="热门时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">24小时</SelectItem>
            <SelectItem value="3d">3天</SelectItem>
            <SelectItem value="1w">1周</SelectItem>
            <SelectItem value="1M">1个月</SelectItem>
            <SelectItem value="3M">3个月</SelectItem>
            <SelectItem value="6M">6个月</SelectItem>
            <SelectItem value="1y">1年</SelectItem>
          </SelectContent>
        </Select>

        <!-- Resolution Settings -->
        <Popover>
          <PopoverTrigger>
            <Button
              variant="outline"
              class="w-full bg-background/50 border-dashed"
            >
              <Icon
                name="heroicons:rectangle-stack"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              分辨率设置
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-60 ml-20">
            <div class="space-y-4">
              <div>
                <Label for="atleast">最小分辨率</Label>
                <Input
                  id="atleast"
                  v-model="searchParams.atleast"
                  placeholder="例如: 1920x1080"
                  @change="handleFilterChange"
                />
              </div>
              <div>
                <Label for="resolutions">指定分辨率</Label>
                <Input
                  id="resolutions"
                  v-model="searchParams.resolutions"
                  placeholder="例如: 1920x1080,2560x1440"
                  @change="handleFilterChange"
                />
              </div>
              <div>
                <Label for="ratios">宽高比</Label>
                <Input
                  id="ratios"
                  v-model="searchParams.ratios"
                  placeholder="例如: 16x9,16x10"
                  @change="handleFilterChange"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Reset Button -->
        <Button
          variant="outline"
          @click="resetSearchParams"
          class="border border-dashed"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4" />
          重置筛选
        </Button>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="text-red-500 mb-4">
      {{ error.message }}
    </div>

    <!-- 无数据提示 -->
    <div
      v-if="status === 'success' && allWallpapers.length === 0"
      class="text-center py-8 text-gray-500"
    >
      未找到相关图片
    </div>

    <!-- 瀑布流展示 -->
    <Waterfallflow
      :images="allWallpapers"
      :loading="isLoading"
      :has-more="hasMore"
      @load-more="loadMore"
    />
  </div>
</template>
