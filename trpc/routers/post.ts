import { z } from "zod";

import { publicProcedure, router } from "..";

export const postRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany();
  }),
});