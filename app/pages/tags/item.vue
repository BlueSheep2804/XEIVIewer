<script setup lang="ts">
  const { data } = await useFetch("/api/tags/item", {
    server: false
  })
  const itemTags = computed(() => {
    return data.value?.filter((tagEntry) => (
      (tagEntry.entry.filter((value) => value.includes(search.value.include_id ?? "")).length !== 0) &&
      commonSearch(search.value, tagEntry.namespace, tagEntry.path)
    ))
  })

  const search: Ref<TagSearch> = ref({})
  const searchEntries: ComputedRef<TagSearchDefine> = computed(() => ({
    mod_id: {
      label: "ModID",
      items: []
    },
    registry_id: {
      label: "タグID",
      items: []
    },
    include_id: {
      label: "登録されているアイテムのID",
      items: []
    }
  }))
</script>

<template>
  <UPageSection>
    <SearchComponent v-model:search="search" :entries="searchEntries"/>
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <template v-for="tag in itemTags">
        <UCard class="block">
          <template #header>
            <h2 class="text-xl">#{{ tag.namespace }}:{{ tag.path }}</h2>
          </template>
          <div class="grid gap-2 place-items-center grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-6">
            <template v-for="item in tag.entry">
              <ItemImage :item="Identifier.parse(item)"/>
            </template>
          </div>
        </UCard>
      </template>
    </div>
  </UPageSection>
</template>