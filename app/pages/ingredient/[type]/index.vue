<script setup lang="ts">
const route = useRoute()

const ingredientType = computed(() => {
  const type = route.params?.type ?? ''
  if (Array.isArray(type)) {
    return type[0] ?? ''
  }
  return type
})
const { data: ingredients, execute: fetchIngredients } = await useIngredients(
  () => {
    if (Array.isArray(ingredientType)) {
      return ingredientType.value[0] ?? ''
    }
    return ingredientType.value
  }
)
await fetchIngredients()

const filteredIngredients = computed(() => {
  return ingredients.value?.filter((value) => {
    return commonSearch(search.value, value.namespace, value.path)
  })
})
const displayedIngredients = computed(() => {
  return filteredIngredients.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const search: Ref<CommonSearch> = ref({})

const searchEntries = computed(() => ({
  mod_id: {
    label: $t('ingredient.search.mod_id'),
    items: [...new Set(ingredients.value?.map(value => value.namespace))]
  },
  registry_id: {
    label: $t('ingredient.search.registry_id'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage(`ingredients/${ingredientType.value}`, 12)
const total = computed(() => filteredIngredients.value?.length ?? 0)
</script>

<template>
  <DatabaseView
    v-model:search="search"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :entries="searchEntries"
    :total="total"
    :items-per-page-step="12"
  >
    <div class="grid justify-items-center gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
      <template v-for="entry in displayedIngredients" :key="entry.id">
        <EntryImage :entry="entry" :entry-type="ingredientType" />
      </template>
    </div>
  </DatabaseView>
</template>
