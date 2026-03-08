<script setup lang="ts">
type Props = {
  item: Identifier
  showLink?: boolean
}
const { item: identifier, showLink = true } = defineProps<Props>()

const isNone = computed(() => identifier.path === '')
const imageUrl = computed(() => `/assets/items/${identifier.namespace}/${identifier.path}.png`)
const linkUrl = computed(() => `/item/${identifier.full}`)
</script>

<template>
  <NuxtLink v-if="showLink && !isNone" :to="linkUrl" class="inline-block">
    <img :src="imageUrl" class="border-2 border-gray-700 bg-gray-400">
  </NuxtLink>
  <img v-else-if="!showLink && !isNone" :src="imageUrl" class="inline-block border-2 border-gray-700 bg-gray-400">
  <div v-else class="inline-block w-full h-full border-2 border-gray-700 bg-gray-400" />
</template>
