import { InferSelectModel, relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import Jobs from "@/src/constants/Jobs";

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
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    firstName: text("first_name").notNull().default(""),
    lastName: text("last_name").notNull().default(""),
    phoneNumber: text("phone_number").notNull().default(""),
    email: text("email").notNull().unique(),
    imageUrl: text("image_url").notNull(),
    skills: customJsonb<{
      job: (typeof Jobs)[number];
      yearsOfExperience: string;
    }>("skills")
      .array()
      .notNull()
      .default(sql`ARRAY[]::jsonb[]`),
  },
  (t) => ({
    userIdIdx: uniqueIndex("user_id_idx").on(t.id),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  resume: one(userResumes, {
    fields: [users.id],
    references: [userResumes.userId],
  }),
  moderator: one(moderators),
  applications: many(applications),
}));

export const userResumes = pgTable("user_resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  key: text("key").unique().notNull(),
  url: text("url").unique().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const moderators = pgTable("moderators", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
  admin: boolean("admin").notNull(),
  userId: uuid("user_id")
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
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
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
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
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
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phoneNumber: text("phone_number").notNull().default(""),
    email: text("email").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.jobId] }),
    applicationUserIdIdx: index("application_user_id_idx").on(t.userId),
    applicationJobIdIdx: index("application_job_id_idx").on(t.jobId),
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
  resume: one(applicationResumes, {
    fields: [applications.userId, applications.jobId],
    references: [applicationResumes.userId, applicationResumes.jobId],
  }),
}));

export const applicationResumes = pgTable(
  "application_resumes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    key: text("key").unique().notNull(),
    url: text("url").unique().notNull(),
    userId: uuid("user_id").notNull(),
    jobId: uuid("job_id").notNull(),
  },
  (t) => ({
    fk: foreignKey({
      columns: [t.userId, t.jobId],
      foreignColumns: [applications.userId, applications.jobId],
      name: "application_resumes_fk",
    }).onDelete("cascade"),
    unq: unique().on(t.userId, t.jobId),
  }),
);

export type User = InferSelectModel<typeof users>;
export type UserResume = InferSelectModel<typeof userResumes>;
export type Moderator = InferSelectModel<typeof moderators>;
export type Company = InferSelectModel<typeof companies>;
export type Job = InferSelectModel<typeof jobs>;
export type Application = InferSelectModel<typeof applications>;
export type ApplicationResume = InferSelectModel<typeof applicationResumes>;

export const UserSchema = createSelectSchema(users);
export const UserResumeSchema = createSelectSchema(userResumes);
export const ModeratorSchema = createSelectSchema(moderators);
export const CompanySchema = createSelectSchema(companies);
export const JobSchema = createSelectSchema(jobs);
export const ApplicationSchema = createSelectSchema(applications);
export const ApplicationResumeSchema = createSelectSchema(applicationResumes);
