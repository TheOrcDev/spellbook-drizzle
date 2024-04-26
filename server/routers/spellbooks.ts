import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import db from "@/db/drizzle";
import { spellbooks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const spellbooksRouter = router({
  get: publicProcedure.query(async () => {
    return await db.query.spellbooks.findMany({
      with: {
        spells: true,
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db.insert(spellbooks).values({
        title: input.title,
        description: input.description,
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db
        .update(spellbooks)
        .set({
          title: input.title,
          description: input.description,
        })
        .where(eq(spellbooks.id, input.id));
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await db.query.spellbooks.findFirst({
        where: eq(spellbooks.id, input.id),
        with: {
          spells: true,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db.delete(spellbooks).where(eq(spellbooks.id, input.id));
    }),
});
