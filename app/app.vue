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

const title = 'XEIEXporter'
const description = 'Web Recipe Viewer for Minecraft'

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
    icon: 'lucide:wand',
    to: '/items'
  },
  {
    label: $t('recipes.title'),
    icon: 'lucide:grid-3x3',
    to: '/recipes'
  },
  {
    label: $t('tags.title'),
    icon: 'lucide:tags',
    children: [
      {
        label: $t('tags.item.title'),
        icon: 'lucide:wand',
        to: '/tags/item'
      }
    ]
  },
  {
    label: $t('mods.title'),
    icon: 'lucide:coffee',
    to: '/mods'
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

        <MCLocaleSelect />

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

      <div class="p-4 space-y-4">
        <p class="text-sm text-muted max-w-120 wrap-break-word">
          {{ $t('common.disclaminer.minecraft') }}
        </p>

        <p class="text-sm text-muted max-w-120 wrap-break-word">
          {{ $t('common.disclaminer.mod_community') }}
        </p>
      </div>

      <template #right>
        <UButton
          to="https://github.com/BlueSheep2804/XEIVIewer"
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
