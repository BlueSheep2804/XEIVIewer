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
const recipeQuery = ref<RecipeQuery>({})
const { data: allRecipeTypes, execute: fetchRecipeTypes, status: recipeTypeStatus } = await useRecipeTypes()
const { data: recipes, execute: fetchRecipes } = await useRecipes(() => recipeType.value?.id)
const { data: lookupRecipes, execute: fetchLookupRecipes } = await useRecipesWithQuery(recipeQuery)

// レシピ
const filteredLookupRecipes = computed(() => {
  return (lookupRecipes.value ?? [])
    .filter(value => value.type === recipeType.value?.id)
})

const displayedRecipes = computed(() => {
  if (isLookupEmpty.value) {
    return (recipes.value ?? [])
      .slice(
        (page.value - 1) * itemsPerPage.value,
        page.value * itemsPerPage.value
      )
  } else {
    return filteredLookupRecipes.value
      .slice(
        (page.value - 1) * itemsPerPage.value,
        page.value * itemsPerPage.value
      )
  }
})

function recipeLink(namespace: string, path: string) {
  return new Identifier(namespace, path).full
}

// レシピタイプ(カテゴリ)
const recipeTypeChoices = computed(() => {
  const recipeTypes: RecipeTypeItem[] = []

  if (isLookupEmpty.value) {
    allRecipeTypes.value?.forEach((recipeType) => {
      recipeTypes.push(convertRecipeTypeItem(recipeType))
    })
  } else {
    new Set(lookupRecipes.value?.map(value => value.type) ?? []).forEach((value) => {
      const recipeType = allRecipeTypes.value?.find(recipeType => recipeType.id === value)
      if (typeof recipeType !== 'undefined') {
        recipeTypes.push(convertRecipeTypeItem(recipeType))
      }
    })
  }
  return recipeTypes
})

function convertRecipeTypeItem(recipeType: RecipeType): RecipeTypeItem {
  const identifier = Identifier.parse(recipeType.id)
  let label = recipeType.titleFallback
  if (
    recipeType.titleKey !== ''
    && typeof mcLang.value !== 'undefined'
    && recipeType.titleKey in mcLang.value
  ) {
    label = mcLang.value[recipeType.titleKey] ?? ''
  }

  return {
    label,
    value: recipeType.id,
    src: `/assets/recipe_type/${identifier.namespace}/${identifier.path}.png`
  }
}

async function changeRecipeType(type: RecipeType | undefined) {
  recipeType.value = type
  updateQuery()
  if (isLookupEmpty.value) {
    await fetchRecipes()
  }
}

async function clickRecipeType(type: string) {
  await changeRecipeType(getRecipeType(type))
  virtualizerScroll(categorySelectTab, type)
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
  if (typeof recipeType.value === 'undefined') return $t('recipes.not_selected')
  return recipeType.value.titleKey !== '' && typeof mcLang.value !== 'undefined' && recipeType.value.titleKey in mcLang.value
    ? mcLang.value[recipeType.value.titleKey]
    : recipeType.value.titleFallback
})

// ページ
const page = ref(1)
const itemsPerPage = useItemsPerPage('recipes', 10)
const total = computed(() => {
  if (isLookupEmpty.value) {
    return recipes.value?.length ?? 0
  } else {
    return filteredLookupRecipes.value.length
  }
})
const openCategorySelect = ref(false)
const categorySelectTab = useTemplateRef('categorySelectTab')
const categorySelect = useTemplateRef('categorySelect')

function virtualizerScroll(scroll: typeof categorySelect, type: string) {
  scroll.value?.virtualizer?.scrollToIndex(
    recipeTypeChoices.value.findIndex(value => value.value === type)
  )
}

function updateCategorySelect() {
  virtualizerScroll(categorySelect, recipeType.value?.id ?? '')
}

// クエリ
const isLookupEmpty = computed(() => (
  typeof recipeQuery.value.input === 'undefined'
  && typeof recipeQuery.value.output === 'undefined'
))

function getQuery(value: (string | null) | (string | null)[] | undefined): string | undefined {
  if (value === null) return
  if (Array.isArray(value)) return
  return value
}

async function updateRecipeQuery() {
  const now: RecipeQuery = {
    input: getQuery(route.query.input),
    output: getQuery(route.query.output)
  }
  if (!(
    recipeQuery.value.input === now.input
    && recipeQuery.value.output === now.output
  )) {
    recipeQuery.value.input = now.input
    recipeQuery.value.output = now.output
    if (!isLookupEmpty.value) {
      await fetchLookupRecipes()
      page.value = 1
      if ((lookupRecipes.value?.length ?? 0) === 0) {
        recipeType.value = undefined
      }
    }
  }
}
await updateRecipeQuery()
watch(route, async () => {
  const type = getQuery(route.query.type)
  if (typeof type === 'string') {
    recipeType.value = getRecipeType(type)
  }
  await updateRecipeQuery()
})

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
  if (recipeTypeStatus.value === 'success') {
    const type = getQuery(route.query.type)
    if (typeof type === 'string') {
      changeRecipeType(getRecipeType(type))
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
      <UScrollArea
        v-if="recipeTypeChoices.length != 0"
        v-slot="{ item }"
        ref="categorySelectTab"
        :items="recipeTypeChoices"
        virtualize
        orientation="horizontal"
        class="w-full h-21"
      >
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
      <UPopover v-model:open="openCategorySelect">
        <template #anchor>
          <div class="flex justify-center">
            <div class="flex items-center mt-4" @click="openCategorySelect = true">
              <p class="text-2xl sm:text-3xl pointer-events-none">
                {{ recipeTypeLabel }}
              </p>
              <UIcon name="lucide:chevron-down" size="xl" class="ml-2" />
            </div>
          </div>
        </template>
        <template #content>
          <div class="size-64">
            <UScrollArea
              v-if="recipeTypeChoices.length != 0"
              v-slot="{ item }"
              ref="categorySelect"
              :items="recipeTypeChoices"
              virtualize
              orientation="vertical"
              class="h-full"
              @vue:updated="updateCategorySelect"
            >
              <UButton
                :color="recipeType?.id === item.value ? 'primary' : 'neutral'"
                :variant="recipeType?.id === item.value ? 'subtle' : 'ghost'"
                class="w-full h-14"
                size="xl"
                :avatar="{
                  src: item.src,
                  size: 'xl',
                  ui: {
                    image: 'rounded-none',
                    root: 'rounded-none bg-transparent'
                  }
                }"
                :label="item.label"
                @click="clickRecipeType(item.value) ; openCategorySelect = false"
              />
            </UScrollArea>
          </div>
        </template>
      </UPopover>
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
