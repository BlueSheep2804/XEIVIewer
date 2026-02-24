<script setup lang="ts">
const { item: identifier } = defineProps({
  item: Identifier
})
const imageUrl = `/assets/items/${identifier?.namespace}/${identifier?.path}.png`
const linkUrl = `/item/${identifier?.full}`
</script>

<template>
  <NuxtLink :to="linkUrl" class="inline">
    <img :src="imageUrl" class="border-2 border-gray-700 bg-gray-400">
  </NuxtLink>
</template>