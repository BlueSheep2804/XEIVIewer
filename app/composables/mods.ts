export const useMods = () => {
  return useApi(
    '/api/mods',
    'mods'
  )
}

export const getModName = async (modId: string): Promise<string> => {
  const { data: mods, execute } = await useMods()
  await execute()

  return getModNameByObject(modId, mods)
}

export const getModNameByObject = (modId: string, mods: Ref<unknown>): string => {
  if (!Array.isArray(mods.value)) return modId

  const result = mods.value.find(value => value.modId === modId)
  if (typeof result === 'undefined') return modId

  if (!('displayName' in result)) return modId

  return result.displayName
}
