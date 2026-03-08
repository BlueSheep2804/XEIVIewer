<script setup lang="ts">
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

  type Props = {
    itemsPerPage: number,
    total: number
  }
  const { itemsPerPage, total } = defineProps<Props>()
  const page = defineModel<number>("page", { required: true })

  const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 1024 })
  const isSmallerSm = breakpoints.smaller("sm")
  const isSm = breakpoints.between("sm", "md")
  const isMd = breakpoints.between("md", "lg")
  const isGreaterLg = breakpoints.greater("lg")

  const siblingCount = computed(() => {
    if (isSmallerSm.value) return 1
    else if (isSm.value) return 3
    else if (isMd.value) return 4
    else return 6
  })


</script>

<template>
  <UPagination
    :show-edges="isGreaterLg"
    :sibling-count="siblingCount"
    v-model:page="page"
    :items-per-page="itemsPerPage"
    :total="total"
    class="flex justify-center"
    :ui="{
      first: 'mr-4',
      last: 'ml-4'
    }"
  />
</template>