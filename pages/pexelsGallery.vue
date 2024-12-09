<template>
  <div class="container mx-auto p-8">
    <div class="mb-6 space-y-4">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Pexels Photo Search</h1>
      </div>

      <!-- Filters Panel -->
      <div
        class="bg-white-50 dark:bg-gray-800 rounded-lg p-2 shadow-sm border mb-5"
      >
        <!-- Search Input with Icon -->

        <!-- Filters Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
          <div class="relative">
            <Input
              v-model="query"
              type="text"
              placeholder="Search photos..."
              class="pl-9"
              @input="(e:Event) => handleSearch((e.target as HTMLInputElement).value)"
            />
            <Icon
              name="heroicons:magnifying-glass"
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>

          <!-- Orientation Filter -->
          <Select
            v-model="orientation"
            @update:modelValue="handleFilterChange"
            class="w-full"
          >
            <SelectTrigger class="bg-background/50 border-dashed">
              <Icon
                name="heroicons:camera"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              <SelectValue :placeholder="'Orientation'" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="option in orientationOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <!-- Size Filter -->
          <Select
            v-model="size"
            @update:modelValue="handleFilterChange"
            class="w-full"
          >
            <SelectTrigger class="bg-background/50 border-dashed">
              <Icon
                name="heroicons:squares-2x2"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              <SelectValue :placeholder="'Size'" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="option in sizeOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <!-- Color Filter -->
          <Select
            v-model="color"
            @update:modelValue="handleFilterChange"
            class="w-full"
          >
            <SelectTrigger class="bg-background/50 border-dashed">
              <Icon
                name="heroicons:swatch"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              <SelectValue :placeholder="'Color'" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="option in colorOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <div class="flex items-center gap-2">
                    <div
                      v-if="option.value !== 'all'"
                      class="w-3 h-3 rounded-full border border-border/50"
                      :class="{
                        'bg-red-500': option.value === 'red',
                        'bg-orange-500': option.value === 'orange',
                        'bg-yellow-500': option.value === 'yellow',
                        'bg-green-500': option.value === 'green',
                        'bg-cyan-500': option.value === 'turquoise',
                        'bg-blue-500': option.value === 'blue',
                        'bg-violet-500': option.value === 'violet',
                        'bg-pink-500': option.value === 'pink',
                        'bg-amber-800': option.value === 'brown',
                        'bg-black dark:bg-white': option.value === 'black',
                        'bg-gray-500': option.value === 'gray',
                        'bg-white dark:bg-black border-border':
                          option.value === 'white',
                      }"
                    ></div>
                    {{ option.label }}
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <!-- Reset Button -->
          <Button
            variant="outline"
            @click="resetSearch"
            class="border border-dashed"
          >
            <Icon name="heroicons:arrow-path" class="w-4 h-4" />

            Reset Filters
          </Button>
        </div>
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
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
const orientation = ref<string>("all");
const size = ref<string>("all");
const color = ref<string>("all");
const page = ref(1);
const per_page = ref(30);
const allPhotos = ref<Photo[]>([]);
const hasMore = ref(true);

const debouncedQuery = ref(query.value);

// Available options
const orientationOptions = [
  { label: "All Orientations", value: "all" },
  { label: "Landscape", value: "landscape" },
  { label: "Portrait", value: "portrait" },
  { label: "Square", value: "square" },
];

const sizeOptions = [
  { label: "All Sizes", value: "all" },
  { label: "Large", value: "large" },
  { label: "Medium", value: "medium" },
  { label: "Small", value: "small" },
];

const colorOptions = [
  { label: "All Colors", value: "all" },
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

// Search function and rest of the script setup remains the same...
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
      orientation: orientation.value === "all" ? undefined : orientation.value,
      size: size.value === "all" ? undefined : size.value,
      color: color.value === "all" ? undefined : color.value,
      per_page: per_page.value,
      page: page.value,
    }),
  {
    immediate: true,
    watch: [query, orientation, size, color, page, per_page],
  }
);

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

watch(
  debouncedQuery,
  async () => {
    if (status.value === "pending") return;
    await refresh();
  },
  { deep: true }
);

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

const resetSearch = () => {
  query.value = defaultQuery;
  orientation.value = "all";
  size.value = "all";
  color.value = "all";
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  refresh();
};

const handleFilterChange = () => {
  page.value = 1;
  hasMore.value = true;
  allPhotos.value = [];
  const params = {
    query: query.value || defaultQuery,
    orientation: orientation.value === "all" ? undefined : orientation.value,
    size: size.value === "all" ? undefined : size.value,
    color: color.value === "all" ? undefined : color.value,
    per_page: per_page.value,
    page: page.value,
  };
  refresh();
};
</script>
