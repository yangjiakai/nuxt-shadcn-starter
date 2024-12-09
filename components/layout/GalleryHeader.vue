<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { ref } from "vue";
import LanguageSwitcher from "../common/LanguageSwitcher.vue";
import ThemeSwitcher from "../common/ThemeSwitcher.vue";
import TopMenu from "../layout/TopMenu.vue";
import { Button } from "../ui/button";

const isMenuOpen = ref(false);

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
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center">
      <!-- Logo Section -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/assets/images/logo.png" alt="Logo" class="h-8 w-8" />
          <span class="hidden font-bold sm:inline-block">Gallery</span>
        </NuxtLink>
      </div>

      <!-- TopMenu Section (centered) -->
      <div class="flex-1 flex justify-center px-4 min-w-80">
        <TopMenu :menu="mainMenu" />
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <LanguageSwitcher />

        <ThemeSwitcher />
        <!-- Mobile Menu Button -->
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Icon
            :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
            class="h-5 w-5"
          />
        </Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="container md:hidden">
      <div class="border-t py-4">
        <TopMenu :menu="mainMenu" class="flex flex-col space-y-4" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
