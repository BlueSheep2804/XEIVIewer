export default function (descriptionId: string | undefined) {
  const { mcLang } = useMCLang()

  if (typeof mcLang.value !== 'undefined') {
    if (typeof descriptionId !== 'undefined' && Object.keys(mcLang.value).includes(descriptionId)) {
      return mcLang.value[descriptionId]
    }
  }
  return descriptionId ?? ''
}
