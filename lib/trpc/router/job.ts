import { publicProcedure, router } from "../init";
import { ApplicationSchema, JobSchema } from "@/db/schema";

export const jobRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.jobs.findMany({
      with: { company: true },
    });
  }),
  getAllByUserId: publicProcedure
    .input(ApplicationSchema.shape.userId)
    .query(({ input, ctx }) => {
      return ctx.db.query.jobs.findMany({
        with: {
          company: true,
          applications: {
            columns: {
              userId: true,
              jobId: true,
            },
            where: (application, { eq }) => eq(application.userId, input),
          },
        },
      });
    }),
  getById: publicProcedure.input(JobSchema.shape.id).query(({ input, ctx }) => {
    return ctx.db.query.jobs.findFirst({
      where: (job, { eq }) => eq(job.id, input),
      with: { company: true },
    });
  }),
});
