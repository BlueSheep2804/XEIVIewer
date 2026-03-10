<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, ja } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()

const availableLocales = [en, ja]

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale
  }
})

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: $t('items.title'),
    icon: 'bi:magic',
    to: '/items'
  },
  {
    label: $t('recipes.title'),
    icon: 'bi:grid-3x3-gap-fill',
    to: '/recipes'
  },
  {
    label: $t('tags.title'),
    icon: 'bi:tags-fill',
    children: [
      {
        label: $t('tags.item.title'),
        icon: 'bi:magic',
        to: '/tags/item'
      }
    ]
  }
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <XEITitle />
      </template>

      <UNavigationMenu :items="navigationItems" />

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />

        <ULocaleSelect :model-value="locale" :locales="availableLocales" @update:model-value="setLocale($event)" />
      </template>

      <template #body>
        <UNavigationMenu :items="navigationItems" orientation="vertical" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
