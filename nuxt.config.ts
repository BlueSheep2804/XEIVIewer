// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
  components: [
    '~/components/common',
    '~/components'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/**': { ssr: false },
    '/assets/**': { noScripts: true, ssr: false }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    compilation: {
      strictMessage: false,
      escapeHtml: true
    },
    locales: [
      { code: 'en', name: 'English', file: 'en.json', language: 'en-US' },
      { code: 'ja', name: 'Japanese', file: 'ja.json', language: 'ja-JP' }
    ]
  }
})
