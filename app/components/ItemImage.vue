<script setup lang="ts">
const { item: identifier, showLink = true } = defineProps({
  item: Identifier,
  showLink: Boolean
})
const imageUrl = `/assets/items/${identifier?.namespace}/${identifier?.path}.png`
const linkUrl = `/item/${identifier?.full}`
</script>

<template>
  <NuxtLink v-if="showLink" :to="linkUrl" class="inline-block">
    <img :src="imageUrl" class="border-2 border-gray-700 bg-gray-400">
  </NuxtLink>
  <img v-if="!showLink" :src="imageUrl" class="border-2 border-gray-700 bg-gray-400">
</template>