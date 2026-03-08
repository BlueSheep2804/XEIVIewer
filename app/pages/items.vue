<script setup lang="ts">
const { data } = await useFetch('/api/items', {
  server: false,
  lazy: true
})

const items = computed(() => {
  return data.value?.filter((value) => {
    return commonSearch(search.value, value.namespace, value.name)
  })
})

const search: Ref<ItemSearch> = ref({})

const searchEntries: ComputedRef<ItemSearchDefine> = computed(() => ({
  mod_id: {
    label: 'ModID',
    items: [...new Set(data.value?.map(value => value.namespace))]
  },
  registry_id: {
    label: 'アイテムID',
    items: []
  }
}))
</script>

<template>
  <UPageSection>
    <SearchComponent v-model:search="search" :entries="searchEntries" />
    <div class="grid justify-items-center gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
      <template v-for="item in items" :key="item.id">
        <ItemImage :item="new Identifier(item.namespace, item.name)" />
      </template>
    </div>
  </UPageSection>
</template>
