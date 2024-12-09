<template>
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
          <h4 class="font-medium leading-none">{{ t("layout.theme") }}</h4>
          <div class="grid grid-cols-5 gap-2">
            <Button
              v-for="theme in themes"
              :key="theme.name"
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              :class="
                currentTheme === theme.name ? 'border-2 border-primary' : ''
              "
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
                  'bg-orange-500': theme.name === 'orange',
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
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const { t, locale } = useI18n();
const colorMode = useColorMode();

const themes = [
  { name: "zinc", label: { en: "Zinc", "zh-CN": "锌" } },
  { name: "slate", label: { en: "Slate", "zh-CN": "石板" } },
  { name: "stone", label: { en: "Stone", "zh-CN": "石头" } },
  { name: "gray", label: { en: "Gray", "zh-CN": "灰色" } },
  { name: "neutral", label: { en: "Neutral", "zh-CN": "中性" } },
  { name: "red", label: { en: "Red", "zh-CN": "红色" } },
  { name: "rose", label: { en: "Rose", "zh-CN": "玫瑰" } },
  { name: "blue", label: { en: "Blue", "zh-CN": "蓝色" } },
  { name: "green", label: { en: "Green", "zh-CN": "绿色" } },
  { name: "orange", label: { en: "Orange", "zh-CN": "橙色" } },
];

const currentTheme = useCookie("theme").value || "zinc";

function setTheme(theme: string) {
  useCookie("theme").value = theme;
  useColorMode().preference = theme;
}

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>
