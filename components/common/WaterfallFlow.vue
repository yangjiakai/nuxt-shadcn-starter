<template>
  <div class="container mx-auto px-4">
    <!-- 瀑布流容器 -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <template v-if="loading && !hasImages">
        <div v-for="i in 4" :key="i" class="flex flex-col gap-4">
          <div v-for="j in 3" :key="j">
            <Skeleton class="h-[200px] w-full rounded-lg" />
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="flex flex-col gap-4"
        >
          <div
            v-for="(item, index) in column"
            :key="item.id"
            class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="relative group">
              <img
                :src="item.url"
                :alt="item.title"
                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end"
              >
                <div
                  class="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                  <p class="text-sm opacity-90">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 加载触发器和加载指示器 -->
    <div
      ref="loadTriggerRef"
      class="w-full h-20 flex items-center justify-center mt-4"
    >
      <div v-if="loading && hasImages" class="grid grid-cols-4 gap-4 w-full">
        <Skeleton v-for="i in 4" :key="i" class="h-[100px] w-full rounded-lg" />
      </div>
      <div v-else-if="!hasMore && hasImages" class="text-gray-500 text-center">
        没有更多图片了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize, useIntersectionObserver } from "@vueuse/core";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";

interface ImageItem {
  id: number | string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

const props = defineProps<{
  images: ImageItem[];
  loading?: boolean;
  hasMore?: boolean;
}>();

const emit = defineEmits<{
  (e: "load-more"): void;
}>();

const columns = ref<ImageItem[][]>([[], [], [], []]);
const { width } = useWindowSize();
const loadTriggerRef = ref<HTMLElement | null>(null);
const loadingMore = ref(false);

const hasImages = computed(() => props.images.length > 0);

// 获取当前应该显示的列数
const getColumnCount = (windowWidth: number): number => {
  if (windowWidth < 640) return 1;
  if (windowWidth < 768) return 2;
  if (windowWidth < 1024) return 3;
  return 4;
};

// 重新分配图片到列
const redistributeImages = () => {
  const columnCount = getColumnCount(width.value);
  const newColumns: ImageItem[][] = Array(columnCount)
    .fill(null)
    .map(() => []);

  // 按照图片高宽比分配到各列，保持各列高度相近
  let columnHeights = new Array(columnCount).fill(0);

  props.images.forEach((image) => {
    const minHeight = Math.min(...columnHeights);
    const columnIndex = columnHeights.indexOf(minHeight);
    newColumns[columnIndex].push(image);
    columnHeights[columnIndex] += image.height / image.width;
  });

  columns.value = newColumns;
};

// 监听窗口大小变化和图片数据变化
watch(
  [width, () => props.images],
  () => {
    redistributeImages();
  },
  { deep: true }
);

// 设置无限滚动
const { stop } = useIntersectionObserver(
  loadTriggerRef,
  ([{ isIntersecting }]) => {
    if (
      isIntersecting &&
      !loadingMore.value &&
      !props.loading &&
      props.hasMore
    ) {
      loadingMore.value = true;
      emit("load-more");
      setTimeout(() => {
        loadingMore.value = false;
      }, 500);
    }
  },
  {
    threshold: 0.5,
    rootMargin: "100px",
  }
);

onMounted(() => {
  redistributeImages();
});

onUnmounted(() => {
  stop();
});
</script>
