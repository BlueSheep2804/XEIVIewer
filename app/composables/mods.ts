export const useMods = () => {
  return useApi(
    '/api/mods',
    'mods'
  )
}
