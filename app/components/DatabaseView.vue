<script setup lang="ts">
const route = useRoute()
const router = useRouter()

type Props = {
  entries: SearchDefine
  total: number
  itemsPerPageStep?: number
}

const { entries, total, itemsPerPageStep } = defineProps<Props>()
const search = defineModel<Search>('search', { required: true })
const page = defineModel<number>('page', { required: true })
const itemsPerPage = defineModel<number>('items-per-page', { required: true })

watch(page, () => {
  router.push({
    query: {
      ...route.query,
      page: page.value
    }
  })
})
</script>

<template>
  <UPageSection>
    <SearchComponent v-model:search="search" :entries="entries" />
    <DatabaseInfo v-model="itemsPerPage" :items-per-page-step="itemsPerPageStep" :total="total" />
    <Pagination v-model:page="page" :items-per-page="itemsPerPage" :total="total" />
    <slot />
    <Pagination v-model:page="page" :items-per-page="itemsPerPage" :total="total" />
  </UPageSection>
</template>
