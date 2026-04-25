<script setup>
const route = useRoute()
const resourceLocation = ref(Identifier.parse(route.params.id.join('/')))

const dataUrl = `/api/recipe/${route.params.id.join('/')}`
const { data: recipeData } = await useFetch(() => dataUrl, {
  server: false
})
const recipe = computed(() => recipeData.value.recipes)
</script>

<template>
  <div>
    <UPageSection v-if="recipeData">
      <h1 class="text-4xl font-bold">
        {{ resourceLocation.full }}
      </h1>
      <div class="flex justify-center">
        <RecipeView :recipe="recipe" />
      </div>
    </UPageSection>
  </div>
</template>
