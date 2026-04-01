import type { fluids, items, mods, recipes, recipeType, tagsItem } from './schema'

export type Mod = typeof mods.$inferSelect
export type Item = typeof items.$inferSelect
export type Recipe = typeof recipes.$inferSelect
export type RecipeType = typeof recipeType.$inferSelect
export type TagItem = typeof tagsItem.$inferSelect
export type Fluid = typeof fluids.$inferSelect

export type CommonEntry = {
  id: number
  namespace: string
  name: string
  descriptionId: string
}
