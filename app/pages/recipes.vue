<script setup lang="ts">
import type { RecipeType } from '~~/shared/tableTypes'

// 汎用
type RecipeTypeItem = {
  label: string
  value: string
  src: string
}

const route = useRoute()
const router = useRouter()

const { mcLang } = useMCLang()

// 初期化
const recipeType = ref<RecipeType>()
const { data: allRecipeTypes, execute: fetchRecipeTypes, status: recipeTypeStatus } = await useRecipeTypes()
const { data: recipes, execute: fetchRecipes } = await useRecipes(() => recipeType.value?.id)

// レシピ
const displayedRecipes = computed(() => {
  return (recipes.value ?? []).slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

function recipeLink(namespace: string, path: string) {
  return new Identifier(namespace, path).full
}

// レシピタイプ(カテゴリ)
const recipeTypeChoices = computed(() => {
  const recipeTypes: RecipeTypeItem[] = []
  allRecipeTypes.value?.forEach((recipeType) => {
    const identifier = Identifier.parse(recipeType.id)
    let label = recipeType.titleFallback
    if (
      recipeType.titleKey !== ''
      && typeof mcLang.value !== 'undefined'
      && recipeType.titleKey in mcLang.value
    ) {
      label = mcLang.value[recipeType.titleKey] ?? ''
    }
    recipeTypes.push({
      label,
      value: recipeType.id,
      src: `/assets/recipe_type/${identifier.namespace}/${identifier.path}.png`
    })
  })
  return recipeTypes
})

async function changeRecipeType(type: RecipeType | undefined) {
  recipeType.value = type
  updateQuery()
  await fetchRecipes()
}

async function clickRecipeType(type: string) {
  await changeRecipeType(getRecipeType(type))
  page.value = 1
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

// ページ
const page = ref(1)
const itemsPerPage = useItemsPerPage('recipes', 10)
const total = computed(() => recipes.value?.length ?? 0)

// クエリ
function updateQuery() {
  router.push({
    query: {
      ...route.query,
      type: recipeType.value?.id
    }
  })
}

// データ取得
const recipeTypeInit = watch(recipeTypeStatus, async () => {
  console.log(recipeTypeStatus.value)
  if (recipeTypeStatus.value === 'success') {
    if ('type' in route.query && typeof route.query.type === 'string') {
      changeRecipeType(getRecipeType(route.query.type))
    } else {
      changeRecipeType(allRecipeTypes.value?.at(0))
    }
    recipeTypeInit.stop()
  }
})
await fetchRecipeTypes()
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
    <CommonPagination v-model="page" :total="total" :items-per-page="itemsPerPage">
      <div class="grid gap-4 justify-items-center items-center grid-cols-1 lg:grid-cols-2">
        <template v-for="recipe in displayedRecipes" :key="recipe.id">
          <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`" class="h-fit">
            <RecipeView :recipe="recipe" />
          </NuxtLink>
        </template>
      </div>
    </CommonPagination>
  </div>
</template>
