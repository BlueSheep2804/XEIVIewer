<script setup lang="ts">
import type { Mod } from '~~/shared/tableTypes'

const route = useRoute()

const { data: mods, execute } = await useMods()
await execute()

const allMods: ComputedRef<Mod[]> = computed(() => {
  if (!Array.isArray(mods.value)) return []
  return mods.value.filter((value) => {
    return (
      value.modId?.includes(search.value.mod_id ?? '')
      && value.authors?.toLowerCase().includes(search.value.authors?.toLowerCase() ?? '')
      && value.license?.toLowerCase().includes(search.value.license?.toLowerCase() ?? '')
    )
  })
})
const displayedMods = computed(() => {
  return allMods.value?.slice(
    (page.value - 1) * itemsPerPage.value,
    page.value * itemsPerPage.value
  )
})

const search: Ref<ModSearch> = ref({})
const searchEntries: ComputedRef<ModSearchDefine> = computed(() => ({
  mod_id: {
    label: $t('mods.search.mod_id'),
    items: []
  },
  authors: {
    label: $t('mods.search.authors'),
    items: []
  },
  license: {
    label: $t('mods.search.license'),
    items: []
  }
}))

const page = ref(Number.parseInt(route.query?.page?.toString() ?? '1'))
const itemsPerPage = useItemsPerPage('mods', 10)
const total = computed(() => allMods.value?.length ?? 0)
</script>

<template>
  <DatabaseView
    v-model:search="search"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :entries="searchEntries"
    :total="total"
    :items-per-page-step="1"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <template v-for="mod in displayedMods" :key="mod.modId">
        <UCard>
          <template #header>
            <p class="text-lg">
              {{ mod.displayName }}
            </p>
            <div class="flex justify-between">
              <p class="text-sm text-muted">
                {{ mod.modId }}
              </p>
              <p class="text-sm text-muted">
                {{ mod.version }}
              </p>
            </div>
          </template>
          <BadgeComponent icon="lucide:users" :label="$t('mods.authors')" :text="mod.authors" color="success" />
          <BadgeComponent icon="lucide:book-open" :label="$t('mods.license')" :text="mod.license" color="warning" />
          <p class="mt-2">
            {{ mod.description }}
          </p>
        </UCard>
      </template>
    </div>
  </DatabaseView>
</template>
