export const useItemsPerPage = (path: string, default_: number) => {
  return useCookie<number>(`items_per_page_${path}`, {
    default() {
      return default_
    },
    path: '/',
    maxAge: 34560000
  })
}
