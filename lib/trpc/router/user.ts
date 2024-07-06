import { eq } from "drizzle-orm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { publicProcedure, router } from "../init";
import { ApplicationSchema, JobSchema, UserSchema, users } from "@/db/schema";

const UserUpdateSchema = z.object({
  userId: UserSchema.shape.id,
  firstName: UserSchema.shape.firstName.trim(),
  lastName: UserSchema.shape.lastName.trim(),
  phoneNumber: UserSchema.shape.phoneNumber.trim().refine((val) => {
    if (val.length === 0) {
      return true;
    }
    return isValidPhoneNumber(val, "HR");
  }),
  skills: z
    .object({
      job: JobSchema.shape.position,
      yearsOfExperience: z
        .string()
        .trim()
        .refine((val) => {
          const num = Number(val);

          return !isNaN(Number(num.toFixed(1))) && Number(num.toFixed(1)) < 100;
        })
        // limits to 1 decimal number but only if provided
        .transform((shape) => Number(Number(shape).toFixed(1)) + ""),
    })
    .array(),
});

export const userRouter = router({
  getById: publicProcedure
    .input(UserSchema.shape.id)
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, input),
        columns: { createdAt: false, imageUrl: false },
      });

      return user ?? null;
    }),
  getByApplicationId: publicProcedure
    .input(ApplicationSchema.shape.userId)
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, input),
        columns: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
        },
        with: {
          resume: { columns: { key: true, name: true, url: true } },
        },
      });

      return user ?? null;
    }),
  update: publicProcedure.input(UserUpdateSchema).mutation(({ input, ctx }) => {
    const { userId, ...rest } = input;

    const url = `https://api.clerk.com/v1/users/${userId}`;
    fetch(url, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        first_name: rest.firstName,
        last_name: rest.lastName,
      }),
    });

    return ctx.db
      .update(users)
      .set(rest)
      .where(eq(users.id, userId))
      .returning({
        firstName: users.firstName,
        lastName: users.lastName,
        phoneNumber: users.phoneNumber,
        skills: users.skills,
      });
  }),
});
