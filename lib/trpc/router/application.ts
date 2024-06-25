import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { publicProcedure, router } from "../init";
import { ApplicationSchema, applications } from "@/db/schema";

const ApplicationCreateSchema = z.object({
  userId: ApplicationSchema.shape.id,
  jobId: ApplicationSchema.shape.id,
  firstName: ApplicationSchema.shape.firstName.trim(),
  lastName: ApplicationSchema.shape.lastName.trim(),
  email: ApplicationSchema.shape.lastName.trim().email(),
  phoneNumber: ApplicationSchema.shape.phoneNumber.trim().refine((val) => {
    if (val.length === 0) {
      return true;
    }
    return isValidPhoneNumber(val, "HR");
  }),
  resume: ApplicationSchema.shape.resume,
  // coverLetter: ApplicationSchema.shape.coverLetter.trim(),
});

export const applicationRouter = router({
  create: publicProcedure
    .input(ApplicationCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.insert(applications).values(input);
    }),
});
