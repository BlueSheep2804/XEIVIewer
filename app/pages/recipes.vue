<script setup lang="ts">
import type { Recipe, RecipeType } from '~~/shared/tableTypes'

// 汎用
const { mcLang } = useMCLang()

// レシピタイプ(カテゴリ)
const { data: allRecipeTypes, execute: fetchRecipeTypes } = await useRecipeTypes()
await fetchRecipeTypes()
const recipeType = ref<RecipeType>()

const recipeTypeChoices = computed(() => {
  const recipeTypes: {
    label: string
    value: string
    src: string
  }[] = []
  // const registeredMods: string[] = []
  allRecipeTypes.value?.forEach((recipeType) => {
    const identifier = Identifier.parse(recipeType.id)
    const label = recipeType.titleKey !== '' && typeof mcLang.value !== 'undefined' && recipeType.titleKey in mcLang.value
      ? mcLang.value[recipeType.titleKey]
      : recipeType.titleFallback
    recipeTypes.push({
      label,
      value: recipeType.id,
      src: `/assets/recipe_type/${identifier.namespace}/${identifier.path}.png`
    })
  })
  return recipeTypes
})

const clickRecipeType = async (type: string) => {
  recipeType.value = getRecipeType(type)
  await fetchRecipes()
}

const getRecipeType = (type: string): RecipeType | undefined => {
  if (!Array.isArray(allRecipeTypes.value)) return
  return allRecipeTypes.value.find(value => (
    'id' in value
    && typeof value.id === 'string'
    && value.id === type
  ))
}
const recipeTypeLabel = computed(() => {
  if (typeof recipeType.value === 'undefined') return ''
  return recipeType.value.titleKey !== '' && typeof mcLang.value !== 'undefined' && recipeType.value.titleKey in mcLang.value
    ? mcLang.value[recipeType.value.titleKey]
    : recipeType.value.titleFallback
})

// レシピ
const recipes = ref<Recipe[]>([])

const displayedRecipes = computed(() => {
  return recipes.value.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const fetchRecipes = async () => {
  if (typeof recipeType.value === 'undefined') return
  const { data: allRecipes, execute } = await useRecipes(recipeType.value.id)
  await execute()
  recipes.value = allRecipes.value
  page.value = 1
}

const recipeLink = (namespace: string, path: string) => {
  return new Identifier(namespace, path).full
}

// ページ
const page = ref(1)
const itemsPerPage = useItemsPerPage('recipes', 10)
const total = computed(() => recipes.value.length)
</script>

<template>
  <div
    class="flex flex-col items-center px-4 py-12 gap-8"
  >
    <div class="w-[90vw] p-4 shrink bg-muted rounded-2xl">
      <UScrollArea v-slot="{ item }" :items="recipeTypeChoices" orientation="horizontal" class="w-full">
        <button
          class="w-17 p-2 border-2 rounded-t-2xl"
          :class="{
            'bg-primary': recipeType?.id === item.value,
            'hover:bg-primary/75': recipeType?.id === item.value,
            'hover:bg-accented': recipeType?.id !== item.value
          }"
          @click="clickRecipeType(item.value)"
        >
          <img :src="item.src" class="aspect-square">
        </button>
      </UScrollArea>
      <div class="flex justify-center">
        <p class="text-2xl sm:text-3xl mt-4">
          {{ recipeTypeLabel }}
        </p>
      </div>
      <DatabaseInfo v-model="itemsPerPage" :total="total" />
    </div>
    <Pagination v-model:page="page" :total="total" :items-per-page="itemsPerPage" />
    <div class="grid gap-4 justify-items-center items-center grid-cols-1 lg:grid-cols-2">
      <template v-for="recipe in displayedRecipes" :key="recipe.id">
        <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`" class="h-fit">
          <RecipeView :recipe="recipe" />
        </NuxtLink>
      </template>
    </div>
    <Pagination v-model:page="page" :total="total" :items-per-page="itemsPerPage" />
    <!-- <div class="flex">
      <USelect v-model="recipeType" :items="recipeTypeChoices" :ui="{ content: 'min-w-fit' }" />
      <UButton icon="lucide:circle" @click="fetchRecipes" />
    </div> -->
  </div>
</template>
