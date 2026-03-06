export function includeInList(list: string[], search: string | undefined) {
  return (search ?? "") === "" || list.includes(search ?? "")
}

export function commonSearch(search: Search, namespace: string, path: string) {
  return (
    namespace.includes(search.mod_id ?? "") &&
    path.includes(search.registry_id ?? "")
  )
}
