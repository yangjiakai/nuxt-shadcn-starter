<template>
  <div class="relative flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 border-r bg-background">
      <div class="p-6">
        <h2 class="text-lg font-semibold">{{ t("layout.logo") }}</h2>
      </div>
      <nav class="space-y-1 px-2">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
            'hover:bg-accent hover:text-accent-foreground',
            $route.path === item.path
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/60',
          ]"
        >
          <Icon
            :name="item.icon"
            class="mr-3 h-4 w-4"
            :class="
              $route.path === item.path
                ? 'text-accent-foreground'
                : 'text-foreground/60'
            "
          />
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <LayoutHeader />
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navigationItems = [
  {
    name: "Home",
    path: "/",
    icon: "lucide:home",
  },
  {
    name: "Buttons",
    path: "/buttonTest",
    icon: "lucide:mouse-pointer-click",
  },
  {
    name: "Carousel",
    path: "/carouselTest",
    icon: "lucide:image",
  },
  {
    name: "Select",
    path: "/selectTest",
    icon: "lucide:list-filter",
  },
  // waterfallflow
  {
    name: "WaterfallFlow",
    path: "/gallery",
    icon: "lucide:image",
  },
  {
    name: "UnsplashTest",
    path: "/unsplashTest",
    icon: "lucide:image",
  },
  // pexels
  {
    name: "PexelsTest",
    path: "/pexelsTest",
    icon: "lucide:image",
  },
  // pexcelSearch
  {
    name: "PexelsSearch",
    path: "/pexelsSearch",
    icon: "lucide:image",
  },
  // wallhavenTest
  {
    name: "WallhavenTest",
    path: "/wallhavenTest",
    icon: "lucide:image",
  },
  // wallhavenSearch
  {
    name: "WallhavenSearch",
    path: "/wallhavenSearch",
    icon: "lucide:image",
  },
];
</script>
