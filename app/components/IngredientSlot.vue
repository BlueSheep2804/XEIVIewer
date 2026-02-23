<script setup lang="ts">
const { ingredient } = defineProps({
  ingredient: Array<String>
})
const ingredients = ingredient?.map((element: any) => {
  return Identifier.parse(element)
});
console.log(ingredients)
</script>

<template>
  <ItemImage :item="ingredients?.at(0)"/>
</template>