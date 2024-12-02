<template>
  <div class="container py-10">
    <h1 class="text-3xl font-bold mb-8">{{ t('pages.carousel.title') }}</h1>

    <!-- Basic Carousel -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">{{ t('pages.carousel.basic') }}</h2>
      <Carousel class="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem v-for="n in 5" :key="n">
            <div class="p-1">
              <div class="flex aspect-square items-center justify-center rounded-lg bg-primary p-6">
                <span class="text-3xl font-semibold text-primary-foreground">{{ n }}</span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    <!-- Carousel with Thumbnails -->
    <div class="space-y-4 mt-12">
      <h2 class="text-2xl font-semibold">{{ t('pages.carousel.thumbnails') }}</h2>
      <Carousel
        :opts="{
          align: 'start',
        }"
        class="w-full max-w-sm"
      >
        <CarouselContent>
          <CarouselItem v-for="image in images" :key="image.src">
            <div class="p-1">
              <img
                :src="image.src"
                :alt="image.alt"
                class="aspect-[3/4] w-full rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    <!-- Carousel with API -->
    <div class="space-y-4 mt-12">
      <h2 class="text-2xl font-semibold">{{ t('pages.carousel.api') }}</h2>
      <div class="flex items-center justify-center space-x-4">
        <Button variant="outline" size="icon" @click="api?.scrollPrev()">
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" @click="api?.scrollNext()">
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </Button>
      </div>
      <Carousel
        :opts="{
          align: 'start',
        }"
        class="w-full max-w-sm"
        @init="setApi"
      >
        <CarouselContent>
          <CarouselItem v-for="n in 5" :key="n">
            <div class="p-1">
              <div class="flex aspect-square items-center justify-center rounded-lg bg-primary p-6">
                <span class="text-3xl font-semibold text-primary-foreground">{{ n }}</span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const { t } = useI18n()

const api = ref<CarouselApi>()
const setApi = (newApi: CarouselApi) => {
  api.value = newApi
}

const images = [
  {
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    alt: 'Sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    alt: 'Mountain',
  },
  {
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    alt: 'Ocean',
  },
  {
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    alt: 'Forest',
  },
]
</script>
