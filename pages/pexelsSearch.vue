<script setup lang="ts">
import Waterfallflow from "~/components/common/WaterfallFlow.vue";
import TopicControl from "~/components/common/TopicControl.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useDebounceFn } from "@vueuse/core";
import type {
  Photo,
  PhotoSearchParams,
  PhotoSearchResponse,
} from "~/types/pexels";

const { searchPhotos } = usePexels();

// Search state
const query = ref("nature");
const page = ref(1);
const per_page = ref(30);
const allPhotos = ref<Photo[]>([]);
const hasMore = ref(true);

// Search response state
const {
  data: response,
  status,
  error,
  refresh,
  clear,
} = await useAsyncData<PhotoSearchResponse>(
  "photos",
  () =>
    searchPhotos({
      query: query.value,
      per_page: per_page.value,
      page: page.value,
    }),
  {
    watch: [query, page, per_page],
  }
);

// Watch for response changes
watch(response, (newResponse) => {
  if (!newResponse?.photos) return;

  if (page.value === 1) {
    allPhotos.value = newResponse.photos;
  } else {
    allPhotos.value = [...allPhotos.value, ...newResponse.photos];
  }

  // Check if we have more photos to load
  hasMore.value = allPhotos.value.length < (newResponse.total_results || 0);
});

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
const handleSearch = useDebounceFn(async (newQuery: string) => {
  if (!newQuery.trim()) return;

  query.value = newQuery;
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];

  await refresh();
}, 1000);

// Load more handler
const loadMore = async () => {
  if (!hasMore.value || status.value === "pending") return;

  page.value++;
  await refresh();
};

// Reset search
const resetSearch = () => {
  query.value = "nature";
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  clear();
  refresh();
};
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="mb-6 space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Pexels Photo Search</h1>
        <button
          @click="resetSearch"
          class="px-4 py-2 text-sm rounded-lg bg-secondary hover:bg-secondary/90"
        >
          Reset
        </button>
      </div>
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
      v-else
      :images="photos"
      :loading="isLoading"
      :has-more="hasMore"
      @load-more="loadMore"
    />

    <div
      v-if="!hasMore && photos.length > 0"
      class="text-center mt-8 text-gray-500"
    >
      No more photos to load
    </div>
  </div>
</template>
