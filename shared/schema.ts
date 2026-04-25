import { pgTable, serial, text, integer, jsonb } from 'drizzle-orm/pg-core'
import type { RecipeEntry } from './tableTypes'

export const tagsEntry = {
  id: serial().primaryKey().notNull(),
  namespace: text().notNull(),
  path: text().notNull(),
  entry: text().array().notNull()
}

export const tagsItem = pgTable('tags_item', {
  ...tagsEntry
})

export const tagsFluid = pgTable('tags_fluid', {
  ...tagsEntry
})

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

export const items = pgTable('items', {
  id: serial().primaryKey().notNull(),
  namespace: text().notNull(),
  name: text().notNull(),
  descriptionId: text().notNull(),
  maxDamage: integer().notNull(),
  rarity: text().notNull(),
  class: text().notNull()
})

export const fluids = pgTable('fluids', {
  id: serial().primaryKey().notNull(),
  namespace: text().notNull(),
  name: text().notNull(),
  descriptionId: text().notNull(),
  temperature: integer().notNull()
})
