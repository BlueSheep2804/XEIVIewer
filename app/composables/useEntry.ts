import type { AsyncData } from '#app'
import type { IngredientEntry } from '~~/shared/tableTypes'

export const useItem = async (itemId: string) => {
  return await useApi(`/api/item/${itemId}`, `item#${itemId}`)
}

export const useFluid = async (itemId: string) => {
  return await useApi(`/api/fluid/${itemId}`, `fluid#${itemId}`)
}

export const useIngredient = async (
  ingredientType: string | (() => string),
  ingredientId: string | (() => string)
): Promise<AsyncData<IngredientEntry, unknown>> => {
  const url = () => `/api/ingredient/${getProviderValue(ingredientType)}/${getProviderValue(ingredientId)}`
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
