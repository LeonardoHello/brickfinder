import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { publicProcedure, router } from "../init";
import {
  ApplicationSchema,
  ResumeSchema,
  applications,
  resumes,
} from "@/db/schema";

const ApplicationSubmitSchema = z.object({
  application: z.object({
    userId: ApplicationSchema.shape.userId.uuid(),
    jobId: ApplicationSchema.shape.jobId.uuid(),
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
  resume: ResumeSchema.pick({ name: true, fullPath: true, url: true }),
});

export const applicationRouter = router({
  getAllByUserId: publicProcedure
    .input(ApplicationSchema.shape.userId)
    .query(({ input, ctx }) => {
      return ctx.db.query.applications.findMany({
        where: (application, { eq }) => eq(application.userId, input),
        columns: { jobId: true, createdAt: true },
        with: {
          job: {
            columns: { title: true, location: true },
            with: { company: { columns: { name: true } } },
          },
        },
      });
    }),
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
        with: {
          resume: { columns: { name: true, fullPath: true, url: true } },
        },
      });

      return application ?? null;
    }),
  upsert: publicProcedure
    .input(ApplicationSubmitSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        application: { userId, jobId, ...rest },
        resume,
      } = input;

      const [applicationData] = await ctx.db
        .insert(applications)
        .values(input.application)
        .onConflictDoUpdate({
          target: [applications.userId, applications.jobId],
          set: rest,
        })
        .returning({
          firstName: applications.firstName,
          lastName: applications.lastName,
          email: applications.email,
          phoneNumber: applications.phoneNumber,
        });

      const [resumeData] = await ctx.db
        .insert(resumes)
        .values({ ...resume, userId, jobId })
        .onConflictDoUpdate({
          target: [resumes.userId, resumes.jobId],
          set: resume,
        })
        .returning({
          name: resumes.name,
          fullPath: resumes.fullPath,
          url: resumes.url,
        });

      return { application: applicationData, resume: resumeData };
    }),
});
