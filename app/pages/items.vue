<script setup lang="ts">
const route = useRoute()

const { data: items } = await useFetch('/api/items', {
  server: false,
  lazy: true
})

const allItems = computed(() => {
  return items.value?.filter((value) => {
    return commonSearch(search.value, value.namespace, value.name)
  })
})
const displayedItems = computed(() => {
  return allItems.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const search: Ref<ItemSearch> = ref({})

const searchEntries: ComputedRef<ItemSearchDefine> = computed(() => ({
  mod_id: {
    label: $t('items.search.mod_id'),
    items: [...new Set(items.value?.map(value => value.namespace))]
  },
  registry_id: {
    label: $t('items.search.registry_id'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage('items', 12)
const total = computed(() => allItems.value?.length ?? 0)
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
      <template v-for="item in displayedItems" :key="item.id">
        <ItemImage :item="new Identifier(item.namespace, item.name)" />
      </template>
    </div>
  </DatabaseView>
</template>
