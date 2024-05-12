import { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  customType,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import SKILLS from "../constants/Skills";

const customJsonb = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return "jsonb";
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // clerk user id
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    firstName: text("first_name").notNull().default(""),
    lastName: text("last_name").notNull().default(""),
    email: text("email").notNull().unique(),
    imageUrl: text("image_url").notNull(),
    skills: customJsonb<{
      job: (typeof SKILLS)["jobs"][number];
      yearsOfExperience: (typeof SKILLS)["yearsOfExperience"][number];
    }>("skills")
      .array()
      .notNull()
      .default(sql`ARRAY[]::jsonb[]`),
    cv: text("cv"),
  },
  (t) => ({
    idIdx: uniqueIndex("user_id_idx").on(t.id),
  }),
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    title: text("title").notNull(),
    text: text("text"),
  },
  (t) => ({
    idIdx: uniqueIndex("post_id_idx").on(t.id),
  }),
);

export type User = InferSelectModel<typeof users>;
export type Post = InferSelectModel<typeof posts>;

export const UserSchema = createSelectSchema(users);
export const PostSchema = createSelectSchema(posts);
