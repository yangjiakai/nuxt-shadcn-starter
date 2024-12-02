<template>
  <aside class="fixed left-0 top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
    <ScrollArea class="h-full py-6 pl-8 pr-6 lg:py-8">
      <h4 class="mb-4 text-sm font-medium leading-none">{{ t('layout.components') }}</h4>
      <div class="grid grid-flow-row auto-rows-max text-sm">
        <NuxtLink
          v-for="item in sidebarItems"
          :key="item.href"
          :to="item.href"
          class="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          :class="route.path === item.href ? 'font-medium text-foreground' : 'text-muted-foreground'"
        >
          {{ t(item.title) }}
        </NuxtLink>
      </div>
    </ScrollArea>
  </aside>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'

const { t } = useI18n()
const route = useRoute()

interface SidebarItem {
  title: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'pages.button.title',
    href: '/buttonTest',
  },
  {
    title: 'pages.carousel.title',
    href: '/carouselTest',
  },
]
</script>
