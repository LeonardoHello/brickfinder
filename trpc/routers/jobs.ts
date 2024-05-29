import { publicProcedure, router } from "..";

export const jobRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.jobs.findMany({ with: { company: true } });
  }),
});
