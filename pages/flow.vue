<script setup lang="ts">
import Waterfallflow from "~/components/common/WaterfallFlow.vue";
import TopicControl from "~/components/common/TopicControl.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useDebounceFn } from "@vueuse/core";

const { getTopics, getTopicPhotos } = useUnsplash();
const { data: topicsData } = await getTopics();
const topicTitles = computed(() => {
  return topicsData.value.map((topic: any) => topic.slug);
});

const currentTopic = ref(topicTitles.value[0]);

const topicPhotosData = ref([]);
const isLoading = ref(false);
const topicPhotos = computed(() => {
  return topicPhotosData.value.map((photo: any) => {
    return {
      id: photo.id,
      url: photo.urls.small,
      title: photo.alt_description,
      description: photo.alt_description,
      width: photo.width,
      height: photo.height,
    };
  });
});

const fetchTopicPhotos = async () => {
  isLoading.value = true;
  const { data, status } = await getTopicPhotos(currentTopic.value, {
    per_page: 30,
  });
  topicPhotosData.value = data.value;
  isLoading.value = false;
};

const debouncedFetchTopicPhotos = useDebounceFn(fetchTopicPhotos, 200);

watch(currentTopic, () => {
  debouncedFetchTopicPhotos();
});

await fetchTopicPhotos();
</script>
<template>
  <div class="container p-8">
    <TopicControl class="my-3" :items="topicTitles" v-model="currentTopic" />
    <Waterfallflow :images="topicPhotos" :loading="isLoading" />
  </div>
</template>
