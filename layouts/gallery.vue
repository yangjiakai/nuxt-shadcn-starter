<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import TopMenu from "~/components/layout/TopMenu.vue";
import GalleryHeader from "~/components/layout/GalleryHeader.vue";

const mainMenu = ref([
  {
    text: "home",
    link: "/",
    icon: "solar:widget-add-bold-duotone",
  },
  {
    text: "unpslash",
    link: "/unsplashGallery",
    icon: "solar:gallery-add-line-duotone",
  },
  {
    text: "pexels",
    link: "/pexelsGallery",
    icon: "solar:gallery-edit-bold-duotone",
  },
  {
    text: "wallhaven",
    link: "/wallhavenGallery",
    icon: "solar:gallery-edit-bold-duotone",
  },
]);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <GalleryHeader />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
