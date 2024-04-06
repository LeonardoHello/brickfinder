import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

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

export type User = InferSelectModel<typeof posts>;

export const PostSchema = createSelectSchema(posts);
