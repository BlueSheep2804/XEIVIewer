<script setup lang="ts">
  const { data: allRecipes } = await useFetch("/api/recipes", {
    server: false
  })
  const { data: allRecipeTypes } = await useFetch("/api/recipe_types", {
    server: false
  })
  const recipeLink = (namespace: string, path: string) => {
    return new Identifier(namespace, path).full
  }
  const getRecipeType = (id: String): string => {
    return allRecipeTypes.value?.filter((value) => value.id === id)[0]?.catalyst[0] ?? ""
  }
</script>

<template>
  <div>
    <UPageSection>
        <div v-for="recipe in allRecipes">
          <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`">
            <RecipeView :recipe="recipe" :recipe-type="getRecipeType(recipe.type)"/>
          </NuxtLink>
        </div>
    </UPageSection>
  </div>
</template>