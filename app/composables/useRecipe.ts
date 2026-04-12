export const useRecipeTypes = async () => {
  return await useFetch(
    '/api/recipe_types',
    { key: 'recipe_types', ...defaultApiFetchOptions }
  )
}

export const useRecipes = async (type: string | (() => string | undefined)) => {
  if (typeof type === 'function') {
    return await useFetch(
      () => `/api/recipes/${type()}`,
      {
        ...defaultApiFetchOptions,
        key: () => `recipes#${type()}`,
        default: () => []
      }
    )
  }
  return await useFetch(
    `/api/recipes/${type}`,
    { ...defaultApiFetchOptions, key: `recipes#${type}` }
  )
}

export const useRecipe = async (id: string) => {
  return await useApi(
    `/api/recipe/${id}`,
    `recipe#${id}`
  )
}
