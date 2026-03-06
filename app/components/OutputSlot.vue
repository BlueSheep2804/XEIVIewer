<script setup lang="ts">
type Props = {
  output: string
}
const { output } = defineProps<Props>()
const {identifier, count} = parseEntry(output)
</script>

<template>
  <div class="inline-flex flex-row-reverse items-end-safe">
    <ItemImage :item="identifier" class="block"/>
    <div v-if="count !== 1" class="absolute pointer-events-none p-0.5 m-1 rounded bg-gray-900/40 backdrop-blur-md border-2">
      <p class="text-white text-sm">{{ count }}</p>
    </div>
  </div>
</template>