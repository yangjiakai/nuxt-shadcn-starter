<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

interface MenuItem {
  text: string;
  link: string;
  icon: string;
}

interface Props {
  menu: MenuItem[];
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

// 计算当前路径
const currentPath = computed(() => route.path);

// 计算选中项的索引
const selectedIndex = computed(() =>
  props.menu.findIndex((item) => item.link === currentPath.value)
);

// 处理菜单点击
const handleClick = (item: MenuItem) => {
  router.push(item.link);
};
</script>

<template>
  <div
    class="relative flex items-center rounded-full p-1.5 min-w-[600px] bg-gradient-to-r from-muted/80 via-muted/70 to-muted/80 dark:from-muted/30 dark:via-muted/25 dark:to-muted/30 backdrop-blur-sm border border-border shadow-sm dark:border-border/80"
  >
    <!-- 背景滑块 -->
    <div
      class="absolute h-[calc(100%-12px)] transition-all duration-200 ease-out rounded-full bg-gradient-to-r from-background via-background/95 to-background dark:from-muted-foreground/20 dark:via-background/10 dark:to-muted-foreground/20 shadow-md ring-1 ring-border/50 dark:ring-border/30"
      :style="{
        width: `calc(${100 / menu.length}% - 12px)`,
        left: `calc(${(selectedIndex * 100) / menu.length}% + 6px)`,
      }"
    ></div>

    <!-- 菜单按钮 -->
    <button
      v-for="(item, index) in menu"
      :key="item.link"
      @click="handleClick(item)"
      class="relative flex-1 px-6 py-2 text-sm font-medium transition-all duration-200 z-10 flex items-center justify-center gap-3 hover:scale-105 min-w-[120px]"
      :class="[
        currentPath === item.link
          ? 'text-foreground dark:text-foreground font-semibold'
          : 'text-muted-foreground/90 hover:text-foreground dark:text-muted-foreground/80 dark:hover:text-foreground',
      ]"
    >
      <Icon
        :name="item.icon"
        class="h-4 w-4"
        :class="[
          currentPath === item.link
            ? 'opacity-100'
            : 'opacity-70 group-hover:opacity-100',
        ]"
      />
      <span class="capitalize whitespace-nowrap">{{ item.text }}</span>
    </button>
  </div>
</template>
