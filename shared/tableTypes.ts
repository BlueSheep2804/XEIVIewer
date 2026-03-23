import type { items, mods, recipes, recipeType, tagsItem } from './schema'

export type Mod = typeof mods.$inferSelect
export type Item = typeof items.$inferSelect
export type Recipe = typeof recipes.$inferSelect
export type RecipeType = typeof recipeType.$inferSelect
export type TagItem = typeof tagsItem.$inferSelect
