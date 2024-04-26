import { relations } from "drizzle-orm";
import { text, pgTable, varchar, serial, integer } from "drizzle-orm/pg-core";

export const spellbooks = pgTable("spellbooks", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
});

export const spells = pgTable("spells", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  image: varchar("image").notNull(),
  spellbookId: integer("spellbook_id").references(() => spellbooks.id),
});

export const spellbooksRelation = relations(spellbooks, ({ many }) => ({
  spells: many(spells),
}));

export const spellsRelation = relations(spells, ({ one }) => ({
  spellbook: one(spellbooks, {
    fields: [spells.spellbookId],
    references: [spellbooks.id],
  }),
}));
