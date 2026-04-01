<script setup lang="ts">
const route = useRoute()

const { data: fluids } = await useFetch('/api/fluids', {
  server: false,
  lazy: true
})

const allFluids = computed(() => {
  return fluids.value?.filter((value) => {
    return commonSearch(search.value, value.namespace, value.name)
  })
})
const displayedFluids = computed(() => {
  return allFluids.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const search: Ref<FluidSearch> = ref({})

const searchEntries: ComputedRef<FluidSearchDefine> = computed(() => ({
  mod_id: {
    label: $t('fluids.search.mod_id'),
    items: [...new Set(fluids.value?.map(value => value.namespace))]
  },
  registry_id: {
    label: $t('fluids.search.registry_id'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage('fluids', 12)
const total = computed(() => allFluids.value?.length ?? 0)
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
      <template v-for="fluid in displayedFluids" :key="fluid.id">
        <FluidImage :fluid="fluid" />
      </template>
    </div>
  </DatabaseView>
</template>
