<script setup lang="ts">
const route = useRoute()
const router = useRouter()

type Props = {
  itemsPerPage: number
  total: number
}
const { itemsPerPage, total } = defineProps<Props>()
const page = defineModel<number>({ required: true })

async function updateUrlQuery(n: number) {
  await router.push({
    query: {
      ...route.query,
      page: n
    }
  })
}

function getPage(route_: typeof route): number {
  if ('page' in route_.query && typeof route_.query.page === 'string') {
    return Number.parseInt(route_.query.page)
  } else {
    return 1
  }
}

const queryPage = getPage(route)
if (page.value !== queryPage) {
  page.value = queryPage
}

watch(page, updateUrlQuery)
</script>

<template>
  <div class="flex flex-col gap-8">
    <CommonPaginationBase v-model:page="page" :items-per-page="itemsPerPage" :total="total" @update:page="updateUrlQuery" />
    <slot />
    <CommonPaginationBase v-model:page="page" :items-per-page="itemsPerPage" :total="total" @update:page="updateUrlQuery" />
  </div>
</template>
