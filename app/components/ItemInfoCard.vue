<script setup lang="ts">
type Props = {
  icon: string
  header: string
  value: string
}
const { icon, header, value } = defineProps<Props>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex content-center">
        <UIcon :name="icon" class="size-8" />
        <span class="ml-2 text-xl font-semibold">{{ header }}</span>
      </div>
    </template>
    <p class="ml-2">
      {{ value }}
    </p>
  </UCard>
</template>
