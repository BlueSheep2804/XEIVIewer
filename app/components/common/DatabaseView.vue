<script setup lang="ts">
import Pagination from './Pagination.vue'

const route = useRoute()
const router = useRouter()

type Props = {
  entries: SearchDefine
  total: number
}

const { entries, total } = defineProps<Props>()
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
    <div class="flex">
      <UFormField :label="$t('common.view_count')" class="grow">
        <UInputNumber v-model="itemsPerPage" :step="10" class="w-32" />
      </UFormField>
      <p class="text-md font-medium">
        {{ $t('common.results', { result: total }) }}
      </p>
    </div>
    <Pagination v-model:page="page" :items-per-page="itemsPerPage" :total="total" />
    <slot />
    <Pagination v-model:page="page" :items-per-page="itemsPerPage" :total="total" />
  </UPageSection>
</template>
