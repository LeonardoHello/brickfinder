import { and, eq } from "drizzle-orm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { publicProcedure, router } from "../init";
import {
  ApplicationResumeSchema,
  ApplicationSchema,
  applicationResumes,
  applications,
} from "@/db/schema";

const ApplicationSubmitSchema = z.object({
  application: z.object({
    userId: ApplicationSchema.shape.userId,
    jobId: ApplicationSchema.shape.jobId,
    firstName: ApplicationSchema.shape.firstName.trim(),
    lastName: ApplicationSchema.shape.lastName.trim(),
    email: ApplicationSchema.shape.lastName.trim().email(),
    phoneNumber: ApplicationSchema.shape.phoneNumber.trim().refine((val) => {
      if (val.length === 0) {
        return true;
      }
      return isValidPhoneNumber(val, "HR");
    }),
  }),
  resume: ApplicationResumeSchema.omit({ id: true, userId: true, jobId: true }),
});

export const applicationRouter = router({
  getById: publicProcedure
    .input(ApplicationSchema.pick({ userId: true, jobId: true }))
    .query(async ({ input, ctx }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: (application, { and, eq }) =>
          and(
            eq(application.userId, input.userId),
            eq(application.jobId, input.jobId),
          ),
        columns: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
        },
        with: { resume: { columns: { key: true, name: true, url: true } } },
      });

      return application ?? null;
    }),
  submit: publicProcedure
    .input(ApplicationSubmitSchema)
    .mutation(({ input, ctx }) => {
      const {
        application: { userId, jobId, ...rest },
        resume,
      } = input;

      return ctx.db.batch([
        ctx.db
          .insert(applications)
          .values(input.application)
          .onConflictDoUpdate({
            target: [applications.userId, applications.jobId],
            set: rest,
          }),
        ctx.db
          .insert(applicationResumes)
          .values({ ...resume, userId, jobId })
          .onConflictDoUpdate({
            target: [applicationResumes.userId, applicationResumes.jobId],
            set: resume,
          }),
      ]);
    }),
  update: publicProcedure
    .input(ApplicationSubmitSchema)
    .mutation(({ input, ctx }) => {
      const {
        application: { userId, jobId, ...rest },
        resume,
      } = input;

      return ctx.db.batch([
        ctx.db
          .update(applications)
          .set(rest)
          .where(
            and(eq(applications.userId, userId), eq(applications.jobId, jobId)),
          ),
        ctx.db
          .update(applicationResumes)
          .set(resume)
          .where(
            and(
              eq(applicationResumes.userId, userId),
              eq(applicationResumes.jobId, jobId),
            ),
          ),
      ]);
    }),
});
