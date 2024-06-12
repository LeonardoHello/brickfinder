import { publicProcedure, router } from "..";
import { UserSchema } from "@/lib/db/schema";

export const moderatorRouter = router({
  getById: publicProcedure
    .input(UserSchema.shape.id)
    .query(async ({ input, ctx }) => {
      const moderator = await ctx.db.query.moderators.findFirst({
        where: (moderator, { eq }) => eq(moderator.userId, input),
        with: { company: { columns: {}, with: { jobs: true } } },
      });

      return moderator ?? null;
    }),
});
