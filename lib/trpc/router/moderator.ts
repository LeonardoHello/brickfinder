import { publicProcedure, router } from "../init";
import { UserSchema } from "@/db/schema";

export const moderatorRouter = router({
  getExistanceById: publicProcedure
    .input(UserSchema.shape.id)
    .query(async ({ input, ctx }) => {
      const moderator = await ctx.db.query.moderators.findFirst({
        where: (moderator, { eq }) => eq(moderator.userId, input),
        columns: { id: true },
      });

      return moderator ?? null;
    }),
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
