export const useItem = async (itemId: string) => {
  return await useApi(`/api/item/${itemId}`, `item#${itemId}`)
}
