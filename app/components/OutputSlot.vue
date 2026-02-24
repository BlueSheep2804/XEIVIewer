<script setup lang="ts">
const { output } = defineProps({
  output: String
})

const match = output?.match(/^(?<count>\d+x )?(?<id>[0-9a-z_/.-]+:[0-9a-z_/.-]+)$/)
const count = match?.groups?.count
const id = Identifier.parse(match?.groups?.id ?? "")
console.log(match?.groups)
</script>

<template>
  <!-- <ItemImage :item="Identifier.parse(ingredient)"/> -->
  <ItemImage :item="id"/>
</template>