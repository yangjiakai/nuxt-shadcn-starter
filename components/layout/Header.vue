<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-14 items-center">
      <div class="flex flex-1"></div>
      <div class="flex items-center gap-2">
        <!-- Theme Color -->
        <ThemeSwitcher />

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from "../common/LanguageSwitcher.vue";
import ThemeSwitcher from "../common/ThemeSwitcher.vue";
</script>
