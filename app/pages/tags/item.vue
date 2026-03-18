<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch('/api/tags/item', {
  server: false
})
const itemTags = computed(() => {
  return data.value?.filter(tagEntry => (
    (tagEntry.entry.filter(value => value.includes(search.value.include_id ?? '')).length !== 0)
    && commonSearch(search.value, tagEntry.namespace, tagEntry.path)
  ))
})
const displayedItemTags = computed(() => {
  return itemTags.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const search: Ref<TagSearch> = ref({})
const searchEntries: ComputedRef<TagSearchDefine> = computed(() => ({
  mod_id: {
    label: $t('tags.item.search.mod_id'),
    items: []
  },
  registry_id: {
    label: $t('tags.item.search.registry_id'),
    items: []
  },
  include_id: {
    label: $t('tags.item.search.include_id'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage('tags_item', 10)
const total = computed(() => itemTags.value?.length ?? 0)
</script>

<template>
  <DatabaseView
    v-model:search="search"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :entries="searchEntries"
    :total="total"
  >
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <template v-for="tag in displayedItemTags" :key="tag.id">
        <UCard class="block">
          <template #header>
            <h2 class="text-xl">
              #{{ tag.namespace }}:{{ tag.path }}
            </h2>
          </template>
          <div class="grid gap-2 place-items-center grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-6">
            <template v-for="item in tag.entry" :key="item">
              <ItemImage :item="Identifier.parse(item)" />
            </template>
          </div>
        </UCard>
      </template>
    </div>
  </DatabaseView>
</template>
