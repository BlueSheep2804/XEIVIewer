<script setup lang="ts">
  const { data } = await useFetch("/api/recipes", {
    server: false,
    lazy: true
  })
  const { data: allRecipeTypes } = await useFetch("/api/recipe_types", {
    server: false,
    lazy: true
  })
  const allRecipes = computed(() => {
    return data.value?.filter((value) => (
      commonSearch(search.value, value.namespace, value.path) &&
      includeInList(value.input, search.value.input_id) &&
      includeInList(value.output, search.value.output_id)
    ))
  })
  const recipeLink = (namespace: string, path: string) => {
    return new Identifier(namespace, path).full
  }
  const getRecipeType = (id: String): string => {
    return allRecipeTypes.value?.filter((value) => value.id === id)[0]?.catalyst[0] ?? ""
  }

  const search: Ref<RecipeSearch> = ref({})

  const searchEntries: ComputedRef<RecipeSearchDefine> = computed(() => ({
    mod_id: {
      label: "ModID",
      items: []
    },
    registry_id:{
      label: "レシピID",
      items: []
    },
    input_id: {
      label: "材料",
      items: []
    },
    output_id: {
      label: "完成品",
      items: []
    }
  }))
</script>

<template>
  <UPageSection>
    <SearchComponent v-model:search="search" :entries="searchEntries"/>
    <div class="grid gap-4 items-center grid-cols-1 lg:grid-cols-2">
      <template v-for="recipe in allRecipes">
        <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`" class="h-fit">
          <RecipeView :recipe="recipe" :recipe-type="getRecipeType(recipe.type)"/>
        </NuxtLink>
      </template>
    </div>
  </UPageSection>
</template>