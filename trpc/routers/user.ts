import { eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure, router } from "..";
import SKILLS from "@/lib/constants/Skills";
import { UserSchema, users } from "@/lib/db/schema";

const UserUpdateSchema = z.object({
  userId: UserSchema.shape.id,
  firstName: UserSchema.shape.firstName.trim(),
  lastName: UserSchema.shape.lastName.trim(),
  skills: z
    .object({
      job: z.enum(SKILLS["jobs"]),
      yearsOfExperience: z.enum(SKILLS["yearsOfExperience"]),
    })
    .array(),
});

export const userRouter = router({
  getById: publicProcedure
    .input(UserSchema.shape.id)
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, input),
        columns: { createdAt: false, imageUrl: false, cv: false },
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
        skills: users.skills,
      });
  }),
});
