import type { fluids, ingredientTable, items, mods, recipes, recipeType, tagsItem } from './schema'

export type Mod = typeof mods.$inferSelect
export type Item = typeof items.$inferSelect
export type Recipe = typeof recipes.$inferSelect
export type RecipeType = typeof recipeType.$inferSelect
export type TagItem = typeof tagsItem.$inferSelect
export type Fluid = typeof fluids.$inferSelect
export type IngredientEntry = typeof ingredientTable.$inferSelect

export type CommonEntry = {
  id: number
  type: string
  namespace: string
  path: string
  descriptionId: string
}

export type RecipeEntry = {
  type: string
  entry: string
  amount?: number
  chance?: number
}
