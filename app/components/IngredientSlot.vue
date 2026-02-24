<script setup lang="ts">
const { ingredient } = defineProps({
  ingredient: String
})

const isSingle = !ingredient?.includes(",")
const ingredientList = isSingle ? [ingredient] : ingredient?.split(", ")
</script>

<template>
  <div v-for="i in ingredientList" class="inline-flex">
    <ItemImage :item="Identifier.parse(typeof i == 'string' ? i : '')"/>
  </div>
</template>