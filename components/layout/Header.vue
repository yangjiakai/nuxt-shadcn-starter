<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <div class="flex flex-1"></div>
      <div class="flex items-center gap-2">
        <!-- Theme Color -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="ghost" size="icon">
              <Icon name="lucide:palette" class="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-56">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">{{ t('layout.theme') }}</h4>
              <div class="grid grid-cols-5 gap-2">
                <Button
                  v-for="theme in themes"
                  :key="theme.name"
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8"
                  :class="currentTheme === theme.name ? 'border-2 border-primary' : ''"
                  @click="setTheme(theme.name)"
                >
                  <div
                    class="h-4 w-4 rounded-full"
                    :class="{
                      'bg-zinc-900 dark:bg-zinc-50': theme.name === 'zinc',
                      'bg-slate-900 dark:bg-slate-50': theme.name === 'slate',
                      'bg-stone-900 dark:bg-stone-50': theme.name === 'stone',
                      'bg-gray-900 dark:bg-gray-50': theme.name === 'gray',
                      'bg-neutral-900 dark:bg-neutral-50': theme.name === 'neutral',
                      'bg-red-500': theme.name === 'red',
                      'bg-rose-500': theme.name === 'rose',
                      'bg-blue-500': theme.name === 'blue',
                      'bg-green-500': theme.name === 'green',
                      'bg-orange-500': theme.name === 'orange'
                    }"
                  />
                  <span class="sr-only">{{ theme.label[locale] }}</span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Theme Toggle -->
        <ClientOnly>
          <Button variant="ghost" size="icon" @click="toggleTheme">
            <Icon
              :name="colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
              class="h-5 w-5"
            />
          </Button>
        </ClientOnly>

        <!-- Language Switcher -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
              <Icon :name="currentLocaleIcon" class="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{{ t('layout.language') }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="switchLanguage(locale.code)"
            >
              <Icon :name="locale.icon" class="mr-2 h-4 w-4" />
              {{ locale.name }}
              <Icon
                v-if="currentLocale === locale.code"
                name="lucide:check"
                class="ml-auto h-4 w-4"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'

const { t, locale } = useI18n()
const colorMode = useColorMode()
const { currentTheme, setTheme, themes } = useTheme()

const availableLocales = [
  { code: 'en', name: 'English', icon: 'circle-flags:us' },
  { code: 'zh', name: '中文', icon: 'circle-flags:cn' },
  { code: 'ja', name: '日本語', icon: 'circle-flags:jp' },
]

const currentLocale = computed(() => locale.value)
const currentLocaleIcon = computed(() => {
  const localeData = availableLocales.find(l => l.code === currentLocale.value)
  return localeData?.icon || 'circle-flags:us'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const switchLanguage = (code: string) => {
  locale.value = code
}
</script>