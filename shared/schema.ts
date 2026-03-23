import { pgTable, text, serial, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const mods = pgTable("mods", {
	modId: text().primaryKey().notNull(),
	displayName: text().notNull(),
	version: text().notNull(),
	fileName: text().notNull(),
	authors: text().notNull(),
	description: text().notNull(),
	url: text().notNull(),
	license: text().notNull(),
});

export const items = pgTable("items", {
	id: serial().primaryKey().notNull(),
	namespace: text().notNull(),
	name: text().notNull(),
	descriptionId: text().notNull(),
	maxDamage: integer().notNull(),
	rarity: text().notNull(),
	class: text().notNull(),
});

export const tagsItem = pgTable("tags_item", {
	id: serial().primaryKey().notNull(),
	namespace: text().notNull(),
	path: text().notNull(),
	entry: text().array().notNull(),
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
