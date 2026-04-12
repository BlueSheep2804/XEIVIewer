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

export const useRecipeTypes = async () => {
  return await useApi(
    '/api/recipe_types',
    'recipe_types'
  )
}

export const useRecipes = async (type: string) => {
  return await useApi(
    `/api/recipes/${type}`,
    `recipes#${type}`
  )
}

export const useRecipe = async (id: string) => {
  return await useApi(
    `/api/recipe/${id}`,
    `recipe#${id}`
  )
}
