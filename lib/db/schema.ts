import { InferSelectModel, relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import Jobs from "../constants/Jobs";

const customJsonb = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return "jsonb";
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);

export const jobTypeEnum = pgEnum("job_type", [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
]);

export const jobPositionEnum = pgEnum("job_position", Jobs);

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
      job: (typeof Jobs)[number];
      yearsOfExperience: string;
    }>("skills")
      .array()
      .notNull()
      .default(sql`ARRAY[]::jsonb[]`),
    resume: text("resume"),
  },
  (t) => ({
    userIdIdx: uniqueIndex("user_id_idx").on(t.id),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  moderator: one(moderators),
  applications: many(applications),
}));

export const moderators = pgTable("moderators", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date(),
  ),
  admin: boolean("admin").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
});

export const moderatorsRelations = relations(moderators, ({ one, many }) => ({
  user: one(users, {
    fields: [moderators.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [moderators.companyId],
    references: [companies.id],
  }),
  jobs: many(jobs),
}));

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    name: text("name").notNull().unique(),
    address: text("address").notNull(),
    email: text("email").notNull(),
    about: text("about"),
  },
  (t) => ({
    companyIdIdx: uniqueIndex("company_id_idx").on(t.id),
  }),
);

export const companiesRelations = relations(companies, ({ many }) => ({
  moderators: many(moderators),
  jobs: many(jobs),
}));

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    expiresAt: timestamp("expires_at", { mode: "date" }),
    title: text("title").notNull(),
    position: jobPositionEnum("position").notNull(),
    location: text("location").notNull(),
    type: jobTypeEnum("type").notNull(),
    salary: integer("salary").notNull(),
    description: text("description").notNull(),
    requirements: text("requirements").notNull(),
    yearsOfExperience: integer("years_of_experience").notNull().default(0),
    moderatorId: uuid("moderator_id")
      .notNull()
      .references(() => moderators.id),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id),
  },
  (t) => ({
    jobIdIdx: uniqueIndex("job_id_idx").on(t.id),
  }),
);

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  moderator: one(moderators, {
    fields: [jobs.moderatorId],
    references: [moderators.id],
  }),
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  applications: many(applications),
}));

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phoneNumber: integer("phone_number"),
    resume: text("resume").notNull(),
    coverLetter: text("cover_letter").default(""),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id),
  },
  (t) => ({
    applicationIdIdx: uniqueIndex("application_id_idx").on(t.id),
  }),
);

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
}));

export type User = InferSelectModel<typeof users>;
export type Moderator = InferSelectModel<typeof moderators>;
export type Company = InferSelectModel<typeof companies>;
export type Job = InferSelectModel<typeof jobs>;
export type Application = InferSelectModel<typeof applications>;

export const UserSchema = createSelectSchema(users);
export const ModeratorSchema = createSelectSchema(moderators);
export const CompanySchema = createSelectSchema(companies);
export const JobSchema = createSelectSchema(jobs);
export const ApplicationSchema = createSelectSchema(applications);
