<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch('/api/recipes', {
  server: false,
  lazy: true
})
const { data: allRecipeTypes } = await useFetch('/api/recipe_types', {
  server: false,
  lazy: true
})
const allRecipes = computed(() => {
  return data.value?.filter(value => (
    commonSearch(search.value, value.namespace, value.path)
    && includeInList(value.input, search.value.input_id)
    && includeInList(value.output, search.value.output_id)
  ))
})
const displayedRecipes = computed(() => {
  return allRecipes.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})
const recipeLink = (namespace: string, path: string) => {
  return new Identifier(namespace, path).full
}
const getRecipeType = (id: string): string => {
  return allRecipeTypes.value?.filter(value => value.id === id)[0]?.catalyst[0] ?? ''
}

const search: Ref<RecipeSearch> = ref({})

const searchEntries: ComputedRef<RecipeSearchDefine> = computed(() => ({
  mod_id: {
    label: $t('recipes.search.mod_id'),
    items: []
  },
  registry_id: {
    label: $t('recipes.search.registry_id'),
    items: []
  },
  input_id: {
    label: $t('recipes.search.input_id'),
    items: []
  },
  output_id: {
    label: $t('recipes.search.output_id'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = ref(10)
const total = computed(() => allRecipes.value?.length ?? 0)
</script>

<template>
  <DatabaseView
    v-model:search="search"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :entries="searchEntries"
    :total="total"
  >
    <div class="grid gap-4 items-center grid-cols-1 lg:grid-cols-2">
      <template v-for="recipe in displayedRecipes" :key="recipe.id">
        <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`" class="h-fit">
          <RecipeView :recipe="recipe" :recipe-type="getRecipeType(recipe.type)" />
        </NuxtLink>
      </template>
    </div>
  </DatabaseView>
</template>
