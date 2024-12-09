<template>
  <div class="container mx-auto p-8">
    <div class="mb-6 space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Pexels Photo Search</h1>
        <!-- <button
          @click="resetSearch"
          class="px-4 py-2 text-sm rounded-lg bg-secondary hover:bg-secondary/90"
        >
          Reset
        </button> -->
        <Button variant="secondary" @click="resetSearch"> Reset </Button>
      </div>

      <!-- Search Input -->
      <div class="relative">
        <input
          v-model="query"
          type="text"
          placeholder="Search photos..."
          class="w-full p-3 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
          @input="(e) => handleSearch((e.target as HTMLInputElement).value)"
        />
        <span
          v-if="isLoading"
          class="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Skeleton class="h-5 w-5 rounded-full" />
        </span>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Orientation -->
        <select
          v-model="orientation"
          class="w-full p-2 border rounded-lg"
          @change="handleFilterChange"
        >
          <option
            v-for="option in orientationOptions"
            :key="option.value || 'all'"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Size -->
        <select
          v-model="size"
          class="w-full p-2 border rounded-lg"
          @change="handleFilterChange"
        >
          <option
            v-for="option in sizeOptions"
            :key="option.value || 'all'"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Color -->
        <select
          v-model="color"
          class="w-full p-2 border rounded-lg"
          @change="handleFilterChange"
        >
          <option
            v-for="option in colorOptions"
            :key="option.value || 'all'"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="error" class="text-red-500 mb-4">
      {{ error.message }}
    </div>

    <div
      v-if="status === 'success' && photos.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No photos found for "{{ query }}"
    </div>

    <Waterfallflow
      :images="photos"
      :loading="isLoading"
      :has-more="hasMore"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import Waterfallflow from "~/components/common/WaterfallFlow.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useDebounceFn } from "@vueuse/core";
import type {
  Photo,
  PhotoSearchParams,
  PhotoSearchResponse,
} from "~/types/pexels";
import Button from "~/components/ui/button/Button.vue";
definePageMeta({
  layout: "gallery",
});
const { searchPhotos } = usePexels();

// Search state
const defaultQuery = "wallpaper";
const query = ref(defaultQuery);
const orientation = ref<PhotoSearchParams["orientation"]>();
const size = ref<PhotoSearchParams["size"]>();
const color = ref<string>("");
const page = ref(1);
const per_page = ref(30);
const allPhotos = ref<Photo[]>([]);
const hasMore = ref(true);

const debouncedQuery = ref(query.value);

// Available options
const orientationOptions = [
  { label: "All", value: undefined },
  { label: "Landscape", value: "landscape" },
  { label: "Portrait", value: "portrait" },
  { label: "Square", value: "square" },
];

const sizeOptions = [
  { label: "All", value: undefined },
  { label: "Large", value: "large" },
  { label: "Medium", value: "medium" },
  { label: "Small", value: "small" },
];

const colorOptions = [
  { label: "All", value: "" },
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
  { label: "Turquoise", value: "turquoise" },
  { label: "Blue", value: "blue" },
  { label: "Violet", value: "violet" },
  { label: "Pink", value: "pink" },
  { label: "Brown", value: "brown" },
  { label: "Black", value: "black" },
  { label: "Gray", value: "gray" },
  { label: "White", value: "white" },
];

// Search function
const performSearch = async (searchParams: any) => {
  const result = await searchPhotos(searchParams);
  if (result?.photos) {
    if (page.value === 1) {
      allPhotos.value = result.photos;
    } else {
      allPhotos.value = [...allPhotos.value, ...result.photos];
    }
    hasMore.value = allPhotos.value.length < (result.total_results || 0);
  }
  return result;
};

// Search response state
const {
  data: response,
  status,
  error,
  refresh,
} = await useAsyncData<PhotoSearchResponse>(
  "photos",
  () =>
    performSearch({
      query: query.value || defaultQuery,
      orientation: orientation.value,
      size: size.value,
      color: color.value || undefined,
      per_page: per_page.value,
      page: page.value,
    }),
  {
    immediate: true,
    watch: [query, orientation, size, color, page, per_page],
  }
);

// Computed photos for waterfall
const photos = computed(() => {
  return allPhotos.value.map((photo: Photo) => ({
    id: photo.id,
    url: photo.src.large,
    title: photo.photographer,
    description: photo.alt,
    width: photo.width,
    height: photo.height,
  }));
});

const isLoading = computed(() => status.value === "pending");

// Debounced search handler
const handleSearch = useDebounceFn((newQuery: string) => {
  if (!newQuery.trim() || newQuery.trim() === debouncedQuery.value.trim())
    return;

  debouncedQuery.value = newQuery.trim();
  query.value = newQuery.trim();
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  refresh();
}, 1000);

// Watch for query changes
watch(
  debouncedQuery,
  async () => {
    if (status.value === "pending") return;
    await refresh();
  },
  { deep: true }
);

// Load more handler
const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return;

  try {
    page.value++;
    await refresh();
  } catch (err) {
    console.error("Error loading more photos:", err);
    page.value--;
    hasMore.value = false;
  }
};

// Reset search
const resetSearch = () => {
  query.value = defaultQuery;
  orientation.value = undefined;
  size.value = undefined;
  color.value = "";
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  refresh();
};

// Handle filter changes
const handleFilterChange = () => {
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  refresh();
};
</script>
