<script setup lang="ts">
const { ingredient } = defineProps({
  ingredient: String
})

const isSingle = !ingredient?.includes(",")
const ingredientList = isSingle ? [ingredient] : ingredient?.split(", ")
</script>

<template>
  <!-- <ItemImage :item="Identifier.parse(ingredient)"/> -->
  <div v-for="i in ingredientList" class="inline-block">
    <ItemImage :item="Identifier.parse(typeof i == 'string' ? i : '')"/>
  </div>
</template>