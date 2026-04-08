<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { en, ja } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()

const availableLocales = [en, ja]

const { reload } = useMCLang()
const mcLangCode = useMCLangCode()
const { data } = await useFetch('/assets/lang/available.json', {
  server: false
})

const mcLanguages = computed<SelectItem[]>(() => {
  if (typeof data.value !== 'object') return []
  const langs = data.value as Record<string, string>
  const result: SelectItem[] = [
    {
      type: 'label',
      label: $t('common.minecraft_language')
    },
    {
      type: 'separator'
    }
  ]
  for (const l in langs) {
    result.push({
      label: langs[l],
      value: l
    })
  }
  return result
})

await callOnce('xei_LocaleLoading', async () => {
  await reload()
})

watch(mcLangCode, () => reload())

const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 1024 })
const isSmallerSm = breakpoints.smaller('sm')
const selectClass = computed(() => ({
  'w-16': isSmallerSm.value
}))

const setLocaleTyped = (loc: string) => {
  if (loc === 'en' || loc === 'ja') {
    setLocale(loc)
  }
}
</script>

<template>
  <div class="flex">
    <USelect
      v-model="mcLangCode"
      :items="mcLanguages"
      icon="lucide:box"
      class="mr-2"
      :class="selectClass"
      :ui="{ content: 'min-w-fit' }"
    />
    <ULocaleSelect
      :model-value="locale"
      :locales="availableLocales"
      icon="lucide:globe"
      :class="selectClass"
      :ui="{ content: 'min-w-fit' }"
      @update:model-value="setLocaleTyped($event)"
    />
  </div>
</template>
