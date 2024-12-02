<template>
  <div class="container p-8">
    <div class="space-y-8">
      <!-- Topics Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Topics Test</h2>
        <Button @click="testGetTopics">Test Get Topics</Button>
        <pre v-if="topicsResult" class="p-4 bg-gray-100 rounded overflow-auto max-h-60">{{ JSON.stringify(topicsResult, null, 2) }}</pre>
      </div>

      <!-- Photos Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Photos Test</h2>
        <Button @click="testGetPhotos">Test Get Photos</Button>
        <pre v-if="photosResult" class="p-4 bg-gray-100 rounded overflow-auto max-h-60">{{ JSON.stringify(photosResult, null, 2) }}</pre>
      </div>

      <!-- Random Photo Test -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Random Photo Test</h2>
        <Button @click="testGetRandomPhoto">Test Get Random Photo</Button>
        <pre v-if="randomPhotoResult" class="p-4 bg-gray-100 rounded overflow-auto max-h-60">{{ JSON.stringify(randomPhotoResult, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { getTopics, getPhotos, getRandomPhoto } = useUnsplash()

// Results
const topicsResult = ref(null)
const photosResult = ref(null)
const randomPhotoResult = ref(null)

// Test functions
const testGetTopics = async () => {
  try {
    const { data, error } = await getTopics({
      per_page: 5,
      order_by: 'featured'
    })
    if (error.value) {
      console.error('Error fetching topics:', error.value)
      return
    }
    topicsResult.value = data.value
  } catch (err) {
    console.error('Error in testGetTopics:', err)
  }
}

const testGetPhotos = async () => {
  try {
    const { data, error } = await getPhotos({
      per_page: 5
    })
    if (error.value) {
      console.error('Error fetching photos:', error.value)
      return
    }
    photosResult.value = data.value
  } catch (err) {
    console.error('Error in testGetPhotos:', err)
  }
}

const testGetRandomPhoto = async () => {
  try {
    const { data, error } = await getRandomPhoto({
      count: 1
    })
    if (error.value) {
      console.error('Error fetching random photo:', error.value)
      return
    }
    randomPhotoResult.value = data.value
  } catch (err) {
    console.error('Error in testGetRandomPhoto:', err)
  }
}
</script>