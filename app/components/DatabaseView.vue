<script setup lang="ts">
type Props = {
  entries: SearchDefine
  total: number
  itemsPerPageStep?: number
}

const { entries, total, itemsPerPageStep } = defineProps<Props>()
const search = defineModel<Search>('search', { required: true })
const page = defineModel<number>('page', { required: true })
const itemsPerPage = defineModel<number>('items-per-page', { required: true })
</script>

<template>
  <UPageSection>
    <SearchComponent v-model:search="search" :entries="entries" />
    <DatabaseInfo v-model="itemsPerPage" :items-per-page-step="itemsPerPageStep" :total="total" />
    <CommonPagination v-model="page" :items-per-page="itemsPerPage" :total="total">
      <slot />
    </CommonPagination>
  </UPageSection>
</template>
