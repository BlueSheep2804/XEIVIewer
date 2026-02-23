<script setup lang="ts">
  const { data: recipes } = await useFetch("/api/recipes", {
    server: false
  })
  const recipeLink = (namespace: string, path: string) => {
    return new Identifier(namespace, path).full
  }
</script>

<template>
  <div>
    <UPageSection>
      <!-- <div class="grid justify-items-center gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12"> -->
        <div v-for="recipe in recipes">
          <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`">
            {{recipe}}
            <!-- <img :src="itemImgPath(recipe)"> -->
          </NuxtLink>
        </div>
      <!-- </div> -->
    </UPageSection>
  </div>
</template>