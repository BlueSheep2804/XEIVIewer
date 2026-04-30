export const useTag = async (type: string, tag: string) => {
  return await useFetch(
    `/api/tag/${type}/${tag}`
  )
}
