export const useItem = async (itemId: string) => {
  const nuxtApp = useNuxtApp()
  return await useFetch(`/api/item/${itemId}`, {
    server: false,
    immediate: false,
    lazy: true,
    key: itemId,
    getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  })
}
