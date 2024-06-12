import { publicProcedure, router } from "..";
import { JobSchema } from "@/lib/db/schema";

export const jobRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.jobs.findMany({ with: { company: true } });
  }),
  getById: publicProcedure.input(JobSchema.shape.id).query(({ input, ctx }) => {
    return ctx.db.query.jobs.findFirst({
      where: (job, { eq }) => eq(job.id, input),
      with: { company: true, applications: { columns: { id: true } } },
    });
  }),
});
