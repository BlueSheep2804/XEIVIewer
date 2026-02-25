<script setup lang="ts">
const { item: identifier, showLink = true } = defineProps({
  item: Identifier,
  showLink: Boolean
})
const isNone = identifier?.path === ""
const imageUrl = `/assets/items/${identifier?.namespace}/${identifier?.path}.png`
const linkUrl = `/item/${identifier?.full}`
</script>

<template>
  <NuxtLink v-if="showLink && !isNone" :to="linkUrl" class="inline-block">
    <img :src="imageUrl" class="border-2 border-gray-700 bg-gray-400">
  </NuxtLink>
  <img v-else-if="!showLink && !isNone" :src="imageUrl" class="inline-block border-2 border-gray-700 bg-gray-400">
  <div v-else class="inline-block w-17 h-17 border-2 border-gray-700 bg-gray-400"></div>
</template>