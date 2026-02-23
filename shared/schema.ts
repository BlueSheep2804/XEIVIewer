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

export const recipeSmelting = pgTable("recipe_smelting", {
	id: serial().notNull(),
	namespace: text().notNull(),
	path: text().notNull(),
	input: text().array().array().notNull(),
	output: text().array().array().notNull(),
});

export type Item = typeof items.$inferSelect
export type SmeltingRecipe = typeof recipeSmelting.$inferSelect