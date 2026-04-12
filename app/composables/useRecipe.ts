export const useRecipeTypes = async () => {
  return await useFetch(
    '/api/recipe_types',
    { key: 'recipe_types', ...defaultApiFetchOptions }
  )
}

export const useRecipes = async (type: string) => {
  return await useFetch(
    `/api/recipes/${type}`,
    { key: `recipes#${type}`, ...defaultApiFetchOptions }
  )
}

export const useRecipe = async (id: string) => {
  return await useApi(
    `/api/recipe/${id}`,
    `recipe#${id}`
  )
}
