export function includeInIngredient(list: string[], search: string[] | undefined): boolean {
  if (typeof search === 'undefined') return true
  if (search.length < 1) return true
  if (search[0] === '') return true

  const result = list.find((value) => {
    const ingredient = new Ingredient(value).value
    return ingredient.some((ingredientValue) => {
      return search.includes(
        (ingredientValue.isTag ? '#' : '') + ingredientValue.value.full
      )
    })
  })
  return typeof result === 'string'
}

export function includeInList(list: string[], search: string | undefined): boolean {
  if (typeof search === 'undefined') return true
  if (search === '') return true

  const result = list.find((value) => {
    return parseEntry(value).identifier.full === search
  })
  return typeof result === 'string'
}

export function commonSearch(search: Search, namespace: string, path: string) {
  return (
    namespace.includes(search.mod_id ?? '')
    && path.includes(search.registry_id ?? '')
  )
}
