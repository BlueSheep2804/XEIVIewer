import { pgTable, serial, text, integer, jsonb } from 'drizzle-orm/pg-core'
import type { RecipeEntry } from './tableTypes'

export const recipes = pgTable('recipes', {
  id: serial().primaryKey().notNull(),
  namespace: text().notNull(),
  path: text().notNull(),
  type: text().notNull(),
  input: jsonb().$type<RecipeEntry[][]>().notNull(),
  output: jsonb().$type<RecipeEntry[][]>().notNull()
})

export const recipeType = pgTable('recipe_type', {
  id: text().primaryKey().notNull(),
  catalyst: jsonb().$type<RecipeEntry[]>().notNull(),
  inputSize: integer().notNull(),
  outputSize: integer().notNull(),
  titleKey: text().notNull(),
  titleFallback: text().notNull()
})

export const mods = pgTable('mods', {
  modId: text().primaryKey().notNull(),
  displayName: text().notNull(),
  version: text().notNull(),
  fileName: text().notNull(),
  authors: text().notNull(),
  description: text().notNull(),
  url: text().notNull(),
  license: text().notNull()
})

export const ingredientType = pgTable('ingredient_type', {
  id: text().primaryKey().notNull(),
  translationKey: text('translation_key').notNull()
})

export const ingredientTable = pgTable('ingredient', {
  id: serial().primaryKey().notNull(),
  type: text().notNull(),
  uniqueId: text().notNull(),
  namespace: text().notNull(),
  path: text().notNull(),
  descriptionId: text().notNull()
})

export const tagTable = pgTable('tag', {
  id: serial().primaryKey().notNull(),
  type: text().notNull(),
  namespace: text().notNull(),
  path: text().notNull(),
  entry: text().array().notNull()
})
