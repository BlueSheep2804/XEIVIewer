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

export type RecipeQuery = {
  input?: string
  output?: string
}

export const useRecipesWithQuery = async (query: Ref<RecipeQuery>) => {
  return await useFetch(
    '/api/recipes',
    {
      ...defaultApiFetchOptions,
      key: () => generateKeyFromQuery(query.value),
      query
    }
  )
}

function generateKeyFromQuery(query: RecipeQuery | undefined): string {
  let key: string
  if (typeof query === 'undefined') return ''
  if (typeof query.input === 'string') {
    key = `input=${query.input}`
  } else if (typeof query.output === 'string') {
    key = `output=${query.output}`
  } else key = ''

  return key
}

export const useRecipe = async (id: string) => {
  return await useApi(
    `/api/recipe/${id}`,
    `recipe#${id}`
  )
}
