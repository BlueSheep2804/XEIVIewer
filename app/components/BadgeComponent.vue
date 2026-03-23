<script setup lang="ts">
type Props = {
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  label: string
  text: string
  icon: string
}
const { color, label, text, icon } = defineProps<Props>()
</script>

<!-- TODO: テキストが少し下にずれているのを直す -->
<template>
  <UTooltip
    :text="text"
    :delay-duration="0"
    arrow
    :ui="{
      text: 'text-sm'
    }"
  >
    <p class="truncate">
      <UBadge
        :icon="icon"
        :label="label"
        :color="color"
        variant="subtle"
        class="mr-1.5 rounded-full"
      />
      <span class="text-sm">{{ text }}</span>
    </p>
  </UTooltip>
</template>
