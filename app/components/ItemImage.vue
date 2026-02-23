<script setup lang="ts">
const { item } = defineProps(["item"])
const identifier = (item instanceof Identifier) ? item : new Identifier(item.namespace, item.name)
const imageUrl = `/assets/items/${identifier.namespace}/${identifier.path}.png`
const linkUrl = `/item/${identifier.full}`
</script>

<template>
  <NuxtLink :to="linkUrl">
    <img :src="imageUrl">
  </NuxtLink>
</template>