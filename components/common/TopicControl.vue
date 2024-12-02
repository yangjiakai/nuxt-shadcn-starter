<template>
    <div class="relative flex items-center bg-black backdrop-blur-sm rounded-full p-1">
      <!-- 背景滑块 -->
      <div
        class="absolute h-[calc(100%-8px)] transition-all duration-200 ease-out bg-white rounded-full"
        :style="{
          width: `calc(${100 / items.length}% - ${items.length > 1 ? '8px' : '0px'})`,
          left: `calc(${(selectedIndex * 100) / items.length}% + 4px)`
        }"
      ></div>
  
      <!-- 选项按钮 -->
      <button
        v-for="(item, index) in items"
        :key="item"
        @click="updateValue(item)"
        class="relative flex-1 px-3 py-1 text-sm font-medium transition-colors duration-200 z-10"
        :class="[modelValue === item ? 'text-gray-900' : 'text-gray-400 hover:text-gray-300']"
      >
        {{ item }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
    interface Props {
      modelValue: string
      items: string[]
    }
  
    const props = defineProps<Props>()
    const emit = defineEmits(['update:modelValue'])
  
    const selectedIndex = computed(() => props.items.findIndex(item => item === props.modelValue))
  
    const updateValue = (value: string) => {
      emit('update:modelValue', value)
    }
  </script>
  