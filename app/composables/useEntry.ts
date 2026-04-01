export const useItem = async (itemId: string) => {
  return await useApi(`/api/item/${itemId}`, `item#${itemId}`)
}

export const useFluid = async (itemId: string) => {
  return await useApi(`/api/fluid/${itemId}`, `fluid#${itemId}`)
}
