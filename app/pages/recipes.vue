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
            <div class="bg-blue-950 flex items-center p-4 rounded-lg">
              <IngredientSlot :ingredient="getRecipeType(recipe.type)" class="mr-8"/>
              <IngredientSlot v-for="value in recipe.input" :ingredient="value"/>
              <UIcon name="bi:arrow-right-square-fill" class="size-8 m-4"/>
              <OutputSlot v-for="value in recipe.output" :output="value"/>
              <!-- {{recipe}} -->
            </div>
          </NuxtLink>
        </div>
    </UPageSection>
  </div>
</template>