import type { UseFetchOptions } from '#app'

export const useApi = async (
  url: string | (() => string),
  key: string | (() => string),
  options?: UseFetchOptions<unknown, unknown, keyof unknown, undefined, string, 'get'> | undefined
) => {
  const nuxtApp = useNuxtApp()
  return await useFetch(url, {
    server: false,
    immediate: false,
    lazy: true,
    key,
    getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    ...options
  })
}
