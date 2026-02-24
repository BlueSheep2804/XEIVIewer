<script setup lang="ts">
  const { data: allRecipes } = await useFetch("/api/recipes", {
    server: false
  })
  const recipeLink = (namespace: string, path: string) => {
    return new Identifier(namespace, path).full
  }
</script>

<template>
  <div>
    <UPageSection>
        <div v-for="recipe in allRecipes">
          <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`">
            <div class="bg-blue-950 flex p-4 rounded-lg">
              <IngredientSlot v-for="value in recipe.input" :ingredient="value"/>
              <UIcon name="bi:arrow-right-square-fill" class="size-8 self-center m-4"/>
              <OutputSlot v-for="value in recipe.output" :output="value"/>
              <!-- {{recipe}} -->
            </div>
          </NuxtLink>
        </div>
    </UPageSection>
  </div>
</template>