<template>
    <div class="container mx-auto px-4">
      <!-- 瀑布流容器 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="(column, columnIndex) in columns" 
          :key="columnIndex" 
          class="flex flex-col gap-4"
        >
          <!-- 每列的图片项 -->
          <div
            v-for="(item, index) in column"
            :key="item.id"
            class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <!-- 图片容器 -->
            <div class="relative group">
              <img
                :src="item.url"
                :alt="item.title"
                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                @load="onImageLoad(columnIndex, index)"
                loading="lazy"
              />
              <!-- 图片信息遮罩 -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div class="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                  <p class="text-sm opacity-90">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useWindowSize } from '@vueuse/core'
  
  interface ImageItem {
    id: number
    url: string
    title: string
    description: string
    width: number
    height: number
  }
  
  const props = defineProps<{
    images: ImageItem[]
  }>()
  
  const columns = ref<ImageItem[][]>([[], [], [], []])
  const { width } = useWindowSize()
  
  // 获取当前应该显示的列数
  const getColumnCount = (windowWidth: number): number => {
    if (windowWidth < 640) return 1
    if (windowWidth < 768) return 2
    if (windowWidth < 1024) return 3
    return 4
  }
  
  // 重新分配图片到列
  const redistributeImages = () => {
    const columnCount = getColumnCount(width.value)
    const newColumns: ImageItem[][] = Array(columnCount).fill(null).map(() => [])
    
    // 按照图片高宽比分配到各列，保持各列高度相近
    let columnHeights = new Array(columnCount).fill(0)
    
    props.images.forEach(image => {
      // 找出当前高度最小的列
      const minHeight = Math.min(...columnHeights)
      const columnIndex = columnHeights.indexOf(minHeight)
      
      // 将图片添加到该列
      newColumns[columnIndex].push(image)
      
      // 更新列高度
      columnHeights[columnIndex] += image.height / image.width
    })
    
    columns.value = newColumns
  }
  
  // 监听窗口大小变化
  watch(width, () => {
    redistributeImages()
  })
  
  // 图片加载完成后的处理
  const onImageLoad = (columnIndex: number, imageIndex: number) => {
    // 可以在这里添加图片加载完成后的动画效果
  }
  
  onMounted(() => {
    redistributeImages()
  })
  </script>
  