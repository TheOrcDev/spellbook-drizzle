import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import db from "@/db/drizzle";
import { spells } from "@/db/schema";
import { eq } from "drizzle-orm";

export const spellsRouter = router({
  get: publicProcedure.query(async () => {
    return await db.query.spells.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        spellbookId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db.insert(spells).values({
        title: input.title,
        description: input.description,
        image: input.image,
        spellbookId: input.spellbookId,
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
      await db.delete(spells).where(eq(spells.id, input.id));
    }),
});
