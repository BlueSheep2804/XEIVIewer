<script setup>
const route = useRoute()
// const resourceLocation = ref(Identifier.parse(route.params.id.join('/')))

const dataUrl = `/api/recipe/${route.params.id.join('/')}`
const { data: recipeData } = await useFetch(() => dataUrl, {
  server: false
})
const recipe = computed(() => recipeData.value.recipes)
</script>

<template>
  <UPageSection v-if="recipeData">
    <div class="flex justify-center">
      <RecipeView :recipe="recipe" />
    </div>
  </UPageSection>
</template>
