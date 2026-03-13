export const useItemTag = async (itemTag: string) => {
  return await useApi(`/api/tag/item/${itemTag}`, `tag.item#${itemTag}`)
}
