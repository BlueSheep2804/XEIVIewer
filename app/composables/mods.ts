export const useMods = () => {
  return useApi(
    '/api/mods',
    'mods'
  )
}

export const getModName = async (modId: string): Promise<string> => {
  const { data: mods, execute } = await useMods()
  await execute()

  if (!Array.isArray(mods.value)) return modId

  const result = mods.value.find(value => value.modId === modId)
  if (typeof result === 'undefined') return modId

  if (!('displayName' in result)) return modId

  return result.displayName
}
