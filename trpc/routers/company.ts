import { publicProcedure, router } from "..";
import { CompanyOwnerSchema } from "@/lib/db/schema";

export const companyRouter = router({
  getByUserId: publicProcedure
    .input(CompanyOwnerSchema.shape.ownerId.nullish())
    .query(({ input, ctx }) => {
      if (!input) {
        return null;
      }
      return ctx.db.query.companyOwners.findMany({
        where: (companyOwner, { eq }) => eq(companyOwner.ownerId, input),
      });
    }),
});
