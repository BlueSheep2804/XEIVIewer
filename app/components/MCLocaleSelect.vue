<script setup lang="ts">
const { reload } = useMCLang()
const mcLangCode = useMCLangCode()
const { data: mcLanguages } = await useFetch('/api/langs', {
  server: false
})

await callOnce(async () => {
  await reload()
})

watch(mcLangCode, () => reload())
</script>

<template>
  <USelect v-model="mcLangCode" :items="mcLanguages?.langs" />
</template>
