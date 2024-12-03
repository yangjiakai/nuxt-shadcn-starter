<template>
  <div class="container p-8">
    <div class="space-y-8">
      <!-- 获取壁纸详情 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Wallpaper Detail Test</h2>
        <div class="flex gap-4">
          <Input
            v-model="wallpaperId"
            placeholder="Enter wallpaper ID"
            class="w-64"
          />
          <Button @click="testGetWallpaperDetail"
            >Test Get Wallpaper Detail</Button
          >
        </div>
        <pre
          v-if="wallpaperDetailResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(wallpaperDetailResult, null, 2) }}</pre
        >
      </div>

      <!-- 搜索壁纸 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Search Wallpapers Test</h2>
        <div class="flex gap-4 flex-wrap">
          <Input
            v-model="searchParams.q"
            placeholder="Search query"
            class="w-64"
          />
          <Select v-model="searchParams.sorting" class="w-48">
            <option value="date_added">Date Added</option>
            <option value="relevance">Relevance</option>
            <option value="random">Random</option>
            <option value="views">Views</option>
            <option value="favorites">Favorites</option>
            <option value="toplist">Toplist</option>
          </Select>
          <Select v-model="searchParams.order" class="w-32">
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </Select>
          <Button @click="testSearchWallpapers">Test Search Wallpapers</Button>
        </div>
        <pre
          v-if="searchResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(searchResult, null, 2) }}</pre
        >
      </div>

      <!-- 获取标签信息 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Tag Info Test</h2>
        <div class="flex gap-4">
          <Input v-model="tagId" placeholder="Enter tag ID" class="w-64" />
          <Button @click="testGetTagInfo">Test Get Tag Info</Button>
        </div>
        <pre
          v-if="tagInfoResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(tagInfoResult, null, 2) }}</pre
        >
      </div>

      <!-- 获取用户设置 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">User Settings Test</h2>
        <Button @click="testGetUserSettings">Test Get User Settings</Button>
        <pre
          v-if="userSettingsResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(userSettingsResult, null, 2) }}</pre
        >
      </div>

      <!-- 获取用户收藏夹 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">User Collections Test</h2>
        <div class="flex gap-4">
          <Input
            v-model="username"
            placeholder="Enter username (optional)"
            class="w-64"
          />
          <Button @click="testGetUserCollections"
            >Test Get User Collections</Button
          >
        </div>
        <pre
          v-if="userCollectionsResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(userCollectionsResult, null, 2) }}</pre
        >
      </div>

      <!-- 获取收藏夹壁纸 Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Collection Wallpapers Test</h2>
        <div class="flex gap-4">
          <Input
            v-model="collectionUsername"
            placeholder="Username"
            class="w-64"
          />
          <Input
            v-model="collectionId"
            placeholder="Collection ID"
            class="w-64"
          />
          <Button @click="testGetCollectionWallpapers"
            >Test Get Collection Wallpapers</Button
          >
        </div>
        <pre
          v-if="collectionWallpapersResult"
          class="p-4 bg-gray-100 rounded overflow-auto max-h-60"
          >{{ JSON.stringify(collectionWallpapersResult, null, 2) }}</pre
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  SearchParams,
  WallpaperDetail,
  Tag,
  SearchResponse,
} from "~/types/wallhaven";

const {
  getWallpaperDetail,
  searchWallpapers,
  getTagInfo,
  getUserSettings,
  getUserCollections,
  getCollectionWallpapers,
} = useWallHaven();

// Input refs
const wallpaperId = ref("d61653");
const tagId = ref("");
const username = ref("");
const collectionUsername = ref("");
const collectionId = ref("");

// Search params with type safety
const searchParams = ref<SearchParams>({
  q: "sky",
  sorting: "date_added",
  order: "desc",
  page: 1,
});

// Results refs with proper typing
const wallpaperDetailResult = ref<WallpaperDetail>();
const searchResult = ref<SearchResponse>();
const tagInfoResult = ref<{ data: Tag }>();
const userSettingsResult = ref<any>();
const userCollectionsResult = ref<any>();
const collectionWallpapersResult = ref<any>();

// Test functions
const testGetWallpaperDetail = async () => {
  try {
    if (!wallpaperId.value) {
      alert("Please enter a wallpaper ID");
      return;
    }
    const { data, error } = await getWallpaperDetail(wallpaperId.value);
    if (error.value) {
      console.error("Error fetching wallpaper detail:", error.value);
      return;
    }
    if (data.value) {
      wallpaperDetailResult.value = data.value;
    }
  } catch (err) {
    console.error("Error in testGetWallpaperDetail:", err);
  }
};

const testSearchWallpapers = async () => {
  try {
    const { data, error } = await searchWallpapers(searchParams.value);
    if (error.value) {
      console.error("Error searching wallpapers:", error.value);
      return;
    }
    if (!data.value) {
      console.error("No data returned from search wallpapers");
      return;
    }
    searchResult.value = data.value;
  } catch (err) {
    console.error("Error in testSearchWallpapers:", err);
  }
};

const testGetTagInfo = async () => {
  try {
    if (!tagId.value) {
      alert("Please enter a tag ID");
      return;
    }
    const { data, error } = await getTagInfo(tagId.value);
    if (error.value) {
      console.error("Error fetching tag info:", error.value);
      return;
    }
    if (!data.value) {
      console.error("No data returned from getTagInfo");
      return;
    }
    tagInfoResult.value = data.value;
  } catch (err) {
    console.error("Error in testGetTagInfo:", err);
  }
};

const testGetUserSettings = async () => {
  try {
    const { data, error } = await getUserSettings();
    if (error.value) {
      console.error("Error fetching user settings:", error.value);
      return;
    }
    userSettingsResult.value = data.value;
  } catch (err) {
    console.error("Error in testGetUserSettings:", err);
  }
};

const testGetUserCollections = async () => {
  try {
    const { data, error } = await getUserCollections(username.value);
    if (error.value) {
      console.error("Error fetching user collections:", error.value);
      return;
    }
    userCollectionsResult.value = data.value;
  } catch (err) {
    console.error("Error in testGetUserCollections:", err);
  }
};

const testGetCollectionWallpapers = async () => {
  try {
    if (!collectionUsername.value || !collectionId.value) {
      alert("Please enter both username and collection ID");
      return;
    }
    const { data, error } = await getCollectionWallpapers(
      collectionUsername.value,
      collectionId.value
    );
    if (error.value) {
      console.error("Error fetching collection wallpapers:", error.value);
      return;
    }
    collectionWallpapersResult.value = data.value;
  } catch (err) {
    console.error("Error in testGetCollectionWallpapers:", err);
  }
};
</script>
