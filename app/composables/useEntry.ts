import type { AsyncData } from '#app'
import type { IngredientEntry } from '~~/shared/tableTypes'

export const useItem = async (itemId: string) => {
  return await useApi(`/api/item/${itemId}`, `item#${itemId}`)
}

export const useFluid = async (itemId: string) => {
  return await useApi(`/api/fluid/${itemId}`, `fluid#${itemId}`)
}

export const useIngredientTypes = async () => {
  return await useFetch(
    '/api/ingredient_types',
    {
      key: 'ingredientTypes',
      ...defaultApiFetchOptions,
      immediate: true
    }
  )
}

export const useIngredients = async (
  ingredientType: string | (() => string)
): Promise<AsyncData<IngredientEntry[], unknown>> => {
  const url = () => `/api/ingredient/${getProviderValue(ingredientType)}`
  const key = () => getProviderValue(ingredientType)
  return await useFetch(
    url,
    {
      key,
      ...defaultApiFetchOptions
    }
  )
}

export const useIngredient = async (
  ingredientType: string | (() => string),
  ingredientId: string | (() => string),
  idAsUniqueId: boolean = false
): Promise<AsyncData<IngredientEntry, unknown>> => {
  let url = () => `/api/ingredient/${getProviderValue(ingredientType)}/${getProviderValue(ingredientId)}`
  if (idAsUniqueId) {
    url = () => `/api/ingredient/${getProviderValue(ingredientType)}/unique_id/${getProviderValue(ingredientId)}`
  }
  const key = () => `${getProviderValue(ingredientType)}#${getProviderValue(ingredientId)}`
  return await useFetch(
    url,
    {
      key,
      ...defaultApiFetchOptions
    }
  )
}

function getProviderValue(provider: string | (() => string)): string {
  if (typeof provider === 'function') {
    return provider()
  } else {
    return provider
  }
}
