import type { ingredientTable, mods, recipes, recipeType, tagTable } from './schema'

export type Mod = typeof mods.$inferSelect
export type Recipe = typeof recipes.$inferSelect
export type RecipeType = typeof recipeType.$inferSelect
export type IngredientEntry = typeof ingredientTable.$inferSelect
export type Tag = typeof tagTable.$inferSelect

export type CommonEntry = {
  id: number
  type: string
  namespace: string
  path: string
  name: string
  uniqueId: string
}

export type RecipeEntry = {
  type: string
  entry: string
  uniqueId?: string
  amount?: number
  chance?: number
}
