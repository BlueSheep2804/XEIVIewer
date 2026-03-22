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

async function reloadLanguage() {
  useMCLang().mcLang.value = await $fetch(`/assets/lang/${useMCLangCode().value}.json`)
}
