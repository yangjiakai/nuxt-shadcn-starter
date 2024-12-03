<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Pixcels API Test</h1>

    <!-- Loading and Error States -->
    <div v-if="loading" class="mb-4">Loading...</div>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Search Photos Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Search Photos</h2>
      <div class="flex gap-4 mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search photos..."
          class="border p-2 rounded"
        />
        <button
          @click="searchPhotos"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <!-- Photos Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="photo in photos" :key="photo.id" class="relative">
          <img
            :src="photo.src.medium"
            :alt="photo.alt"
            class="w-full h-64 object-cover rounded"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
          >
            <p>By: {{ photo.photographer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Videos Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Popular Videos</h2>
      <button
        @click="getPopularVideos"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Load Popular Videos
      </button>

      <!-- Videos Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="video in videos" :key="video.id" class="relative">
          <video :poster="video.image" controls class="w-full rounded">
            <source
              :src="video.video_files[0]?.link"
              :type="video.video_files[0]?.file_type"
            />
            Your browser does not support the video tag.
          </video>
          <div class="mt-2">
            <p>Duration: {{ video.duration }}s</p>
            <p>By: {{ video.user.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Collections Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Featured Collections</h2>
      <button
        @click="getFeaturedCollections"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Load Collections
      </button>

      <!-- Collections List -->
      <div class="space-y-4">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="border p-4 rounded"
        >
          <h3 class="font-semibold">{{ collection.title }}</h3>
          <p>{{ collection.description }}</p>
          <p class="text-sm text-gray-600">
            Photos: {{ collection.photos_count }} | Videos:
            {{ collection.videos_count }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  PexelsPhoto,
  PexelsVideo,
  PexelsCollection,
} from "~/composables/usePexels";

const {
  loading,
  error,
  searchPhotos: searchPixcelsPhotos,
  getPopularVideos: getPixcelsVideos,
  getFeaturedCollections: getPixcelsCollections,
} = usePexels();

const searchQuery = ref("");
const photos = ref<PexelsPhoto[]>([]);
const videos = ref<PexelsVideo[]>([]);
const collections = ref<PexelsCollection[]>([]);

// Search Photos
async function searchPhotos() {
  try {
    const response = await searchPixcelsPhotos({
      query: searchQuery.value,
      per_page: 9,
      page: 1,
    });
    photos.value = response.photos || [];
  } catch (e) {
    console.error("Error searching photos:", e);
  }
}

// Get Popular Videos
async function getPopularVideos() {
  try {
    const response = await getPixcelsVideos({
      per_page: 4,
      page: 1,
    });
    videos.value = response.videos || [];
  } catch (e) {
    console.error("Error getting videos:", e);
  }
}

// Get Featured Collections
async function getFeaturedCollections() {
  try {
    const response = await getPixcelsCollections({
      per_page: 5,
      page: 1,
    });
    collections.value = response.collections || [];
  } catch (e) {
    console.error("Error getting collections:", e);
  }
}
</script>
