<script setup lang="ts">
type Props = {
  itemsPerPageStep?: number
  total: number
}
const { itemsPerPageStep = 10, total } = defineProps<Props>()
const itemsPerPage = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex items-end">
    <UFormField :label="$t('common.view_count')" class="grow">
      <UInputNumber v-model="itemsPerPage" :step="itemsPerPageStep" class="w-32" />
    </UFormField>
    <p class="text-md font-medium">
      {{ $t('common.results', { result: total }) }}
    </p>
  </div>
</template>
