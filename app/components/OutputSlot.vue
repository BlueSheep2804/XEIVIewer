<script setup lang="ts">
const { output } = defineProps({
  output: String
})
const {identifier, count} = parseEntry(output ?? "")
</script>

<template>
  <div class="inline-flex flex-row-reverse items-end-safe">
    <ItemImage :item="identifier" class="block"/>
    <div v-if="count !== 1" class="absolute p-0.5 m-1 bg-gray-900 backdrop-opacity-20 rounded pointer-events-none">{{ count }}</div>
  </div>
</template>