export const useMCLang = () => ({
  reload: reloadLanguage,
  mcLang: useState<{
    [key: string]: string
  }>('mcLang')
})

export const useMCLangCode = () => useState<string>('mcLangCode', () => 'en_us')

async function reloadLanguage() {
  useMCLang().mcLang.value = await $fetch(`/assets/lang/${useMCLangCode().value}.json`)
}
