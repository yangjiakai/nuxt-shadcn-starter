<template>
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
</template>

<script setup lang="ts">
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value)

const availableLocales = [
  { code: 'en', name: 'English', icon: 'flag:us-4x3' },
  { code: 'zh-CN', name: '简体中文', icon: 'flag:cn-4x3' },
]

const currentLocaleIcon = computed(() => {
  const locale = availableLocales.find(l => l.code === currentLocale.value)
  return locale?.icon || 'flag:us-4x3'
})

function switchLanguage(code: string) {
  locale.value = code
}
</script>