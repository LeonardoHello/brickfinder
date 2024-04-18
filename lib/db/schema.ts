import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // clerk user id
    createdAt: timestamp("created_at").notNull().defaultNow(),
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
