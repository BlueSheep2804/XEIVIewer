<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import type { RecipeType, TagItem } from '~~/shared/tableTypes'

const route = useRoute()
const { mcLang } = useMCLang()
const { data: mods, execute: modsExecute } = await useMods()
await modsExecute()

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
  },
  recipe_type: {
    label: $t('recipes.search.recipe_type'),
    items: recipeTypeChoices.value,
    disableSearch: true
  }
}))

const recipeTypeChoices = computed(() => {
  const recipeTypes: SelectItem[] = []
  const registeredMods: string[] = []
  allRecipeTypes.value?.forEach((recipeType) => {
    const identifier = Identifier.parse(recipeType.id)
    const modId = identifier.namespace
    if (!registeredMods.includes(modId)) {
      registeredMods.push(modId)
      recipeTypes.push(
        {
          type: 'separator'
        },
        {
          label: getModNameByObject(modId, mods),
          type: 'label'
        }
      )
    }

    const label = recipeType.titleKey !== '' && typeof mcLang.value !== 'undefined' && recipeType.titleKey in mcLang.value
      ? mcLang.value[recipeType.titleKey]
      : recipeType.titleFallback
    recipeTypes.push({
      label,
      value: recipeType.id,
      avatar: {
        src: `/assets/recipe_type/${identifier.namespace}/${identifier.path}.png`,
        ui: {
          image: 'rounded-none',
          root: 'rounded-none'
        }
      }
    })
  })
  return [
    {
      label: $t('common.all'),
      value: 'all'
    },
    ...recipeTypes
  ]
})

const { data: recipes } = await useFetch('/api/recipes', {
  server: false,
  lazy: true
})
const { data: allRecipeTypes } = await useFetch('/api/recipe_types', {
  server: false,
  lazy: true
})

const allRecipes = computed(() => {
  return recipes.value?.filter((recipe) => {
    const tempSearch = search.value
    return (
      commonSearch(tempSearch, recipe.namespace, recipe.path)
      && includeInIngredient(recipe.input, [tempSearch.input_id ?? '', ...inputIncludeTags.value])
      && includeInIngredient(recipe.output, [tempSearch.output_id ?? ''])
      && (recipe.type === tempSearch.recipe_type || 'all' === (tempSearch.recipe_type ?? 'all'))
    )
  })
})
const displayedRecipes = computed(() => {
  return allRecipes.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const { data: inputTags, execute: inputTagsRefresh } = await useApi(
  () => `/api/tags/item?include_id=${search.value.input_id}`,
  () => `tags.item:${search.value.input_id}`
)
await inputTagsRefresh()

const inputIncludeTags = computed((): string[] => {
  const tags = inputTags.value as Record<keyof TagItem, string>[]
  return tags.map(value => `#${value.namespace}:${value.path}`)
})

const recipeLink = (namespace: string, path: string) => {
  return new Identifier(namespace, path).full
}
const getRecipeType = (id: string): RecipeType | undefined => {
  return allRecipeTypes.value?.filter(value => value.id === id)[0]
}

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage('recipes', 10)
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
    <div class="grid gap-4 justify-items-center items-center grid-cols-1 lg:grid-cols-2">
      <template v-for="recipe in displayedRecipes" :key="recipe.id">
        <NuxtLink :to="`/recipe/${recipeLink(recipe.namespace, recipe.path)}`" class="h-fit">
          <RecipeView :recipe="recipe" :recipe-type="getRecipeType(recipe.type)" />
        </NuxtLink>
      </template>
    </div>
  </DatabaseView>
</template>
