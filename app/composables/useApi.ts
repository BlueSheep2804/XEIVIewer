import type { UseFetchOptions } from '#app'

export const defaultApiFetchOptions = {
  server: false,
  immediate: false,
  lazy: true,
  getCachedData: (key: string) => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
}

export const useApi = async (
  url: string | (() => string),
  key: string | (() => string),
  options?: UseFetchOptions<unknown, unknown, keyof unknown, undefined, string, 'get'> | undefined
) => {
  return await useFetch(url, {
    key,
    ...defaultApiFetchOptions,
    ...options
  })
}
