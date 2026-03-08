<script setup>
const route = useRoute()
const resourceLocation = ref(Identifier.parse(route.params.id.join('/')))

const dataUrl = `/api/recipe/${route.params.id.join('/')}`
const { data: recipeData } = await useFetch(() => dataUrl, {
  server: false
})
const recipe = computed(() => recipeData.value.recipes)
const recipeType = computed(() => recipeData.value.recipe_type)
</script>

<template>
  <div>
    <UPageSection v-if="recipeData">
      <h1 class="text-4xl font-bold">
        {{ resourceLocation.full }}
      </h1>
      <RecipeView :recipe="recipe" :recipe-type="recipeType" />
    </UPageSection>
  </div>
</template>
