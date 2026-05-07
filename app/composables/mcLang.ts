export const useMCLang = () => ({
  reload: reloadLanguage,
  mcLang: useState<{
    [key: string]: string
  }>('mcLang')
})

export const useMCLangCode = () => useCookie<string>('mc_lang_code', {
  default() {
    return 'en_us'
  },
  path: '/',
  maxAge: 34560000
})

export function getTranslation(key: string): string {
  const { mcLang } = useMCLang()
  if (key !== '' && key in mcLang.value) {
    return mcLang.value[key] ?? ''
  }
  return key
}

async function reloadLanguage() {
  useMCLang().mcLang.value = await $fetch(`/assets/lang/${useMCLangCode().value}.json`)
}
