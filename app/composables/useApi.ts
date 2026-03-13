export const useApi = async (url: string, key: string) => {
  const nuxtApp = useNuxtApp()
  return await useFetch(url, {
    server: false,
    immediate: false,
    lazy: true,
    key,
    getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  })
}
