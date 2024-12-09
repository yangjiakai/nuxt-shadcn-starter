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

const {
  data: searchResult,
  error,
  status,
} = await searchWallpapers(searchParams.value);

const isLoading = computed(() => {
  return status.value === "pending";
});

const wallPapers = computed((): ImageItem[] => {
  return (
    searchResult.value?.data.map((wallpaper): ImageItem => {
      return {
        id: wallpaper.id,
        url: wallpaper.thumbs.small,
        title: wallpaper.id,
        description: wallpaper.path,
        width: wallpaper.dimension_x,
        height: wallpaper.dimension_y,
      };
    }) || []
  );
});

const handleSearch = async () => {
  const { data } = await searchWallpapers(searchParams.value);
  searchResult.value = data.value;
};

const debouncedSearch = useDebounceFn(handleSearch, 500);

// Watch for changes in searchParams
watch(
  searchParams,
  () => {
    debouncedSearch();
  },
  { deep: true }
);
</script>

<template>
  <div class="container p-8">
    <!-- Search Panel -->
    <div
      class="bg-white-50 dark:bg-gray-800 rounded-lg p-2 shadow-sm border mb-5"
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
        <Select v-model="searchParams.categories">
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
        <Select v-model="searchParams.purity">
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
        <Select v-model="searchParams.sorting">
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
        <Select v-model="searchParams.order">
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
        <Select v-model="searchParams.topRange">
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
          <PopoverContent class="w-80">
            <div class="space-y-4">
              <div>
                <Label for="atleast">最小分辨率</Label>
                <Input
                  id="atleast"
                  v-model="searchParams.atleast"
                  placeholder="例如: 1920x1080"
                />
              </div>
              <div>
                <Label for="resolutions">指定分辨率</Label>
                <Input
                  id="resolutions"
                  v-model="searchParams.resolutions"
                  placeholder="例如: 1920x1080,2560x1440"
                />
              </div>
              <div>
                <Label for="ratios">宽高比</Label>
                <Input
                  id="ratios"
                  v-model="searchParams.ratios"
                  placeholder="例如: 16x9,16x10"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Reset Button -->
        <Button
          variant="outline"
          @click="
            searchParams = {
              q: '',
              categories: '101',
              purity: '',
              sorting: 'date_added',
              order: 'desc',
              page: 1,
              atleast: '',
              resolutions: '',
              ratios: '',
              colors: '',
              seed: '',
              topRange: '1d',
            }
          "
          class="border border-dashed"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      <!-- Additional Filters -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2"></div>
    </div>

    <Waterfallflow :images="wallPapers" :loading="isLoading" />
  </div>
</template>
