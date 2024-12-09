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
      class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6 mb-8"
    >
      <div class="flex items-center space-x-4">
        <div class="relative w-full">
          <Input
            v-model="searchParams.q"
            placeholder="搜索图片..."
            class="pl-10"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="lucide:search" class="h-4 w-4 text-gray-500" />
          </span>
        </div>
        <Button @click="handleSearch">搜索</Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select v-model="searchParams.categories">
          <SelectTrigger>
            <SelectValue placeholder="选择类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">普通</SelectItem>
            <SelectItem value="101">动漫</SelectItem>
            <SelectItem value="111">人物</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="searchParams.purity">
          <SelectTrigger>
            <SelectValue placeholder="内容分级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">安全</SelectItem>
            <SelectItem value="110">温和</SelectItem>
            <SelectItem value="111">成人</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="searchParams.sorting">
          <SelectTrigger>
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

        <Select v-model="searchParams.order">
          <SelectTrigger>
            <SelectValue placeholder="排序顺序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">降序</SelectItem>
            <SelectItem value="asc">升序</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="searchParams.topRange">
          <SelectTrigger>
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

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" class="w-full">分辨率设置</Button>
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
                <Label for="resolutions">精确分辨率</Label>
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
                  placeholder="例如: 16x9,4x3"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label for="colors">颜色选择</Label>
        <Input
          id="colors"
          v-model="searchParams.colors"
          placeholder="输入颜色代码，例如: 660000,cc6600"
        />
      </div>

      <div class="flex items-center justify-between">
        <Label for="page">页码</Label>
        <Input
          id="page"
          type="number"
          v-model="searchParams.page"
          class="w-20"
          :min="1"
        />
      </div>

      <div>
        <Label for="seed">随机种子</Label>
        <Input
          id="seed"
          v-model="searchParams.seed"
          placeholder="输入随机种子"
        />
      </div>
    </div>

    <Waterfallflow :images="wallPapers" :loading="isLoading" />
  </div>
</template>
