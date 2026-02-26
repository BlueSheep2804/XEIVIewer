import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
	id: serial().primaryKey().notNull(),
	namespace: text().notNull(),
	name: text().notNull(),
	descriptionId: text().notNull(),
	maxDamage: integer().notNull(),
	rarity: text().notNull(),
	class: text().notNull(),
});

export const recipes = pgTable("recipes", {
	id: serial().primaryKey().notNull(),
	namespace: text().notNull(),
	path: text().notNull(),
	type: text().notNull(),
	input: text().array().notNull(),
	output: text().array().notNull(),
});

export const recipeType = pgTable("recipe_type", {
	id: text().primaryKey().notNull(),
	catalyst: text().array().notNull(),
	inputSize: integer().notNull(),
	outputSize: integer().notNull(),
});

export type Item = typeof items.$inferSelect
export type Recipe = typeof recipes.$inferInsert
export type RecipeType = typeof recipeType.$inferSelect
