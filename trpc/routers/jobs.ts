import { publicProcedure, router } from "..";
import { JobSchema } from "@/lib/db/schema";

export const jobRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.jobs.findMany();
  }),
});
