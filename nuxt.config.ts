// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxtjs/i18n'
  ],
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix'
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.yunrobot.cn',
    },
    unsplashApiKey: process.env.UNSPLASH_API_KEY,
    pexelsApiKey: process.env.PEXELS_API_KEY
  },
})