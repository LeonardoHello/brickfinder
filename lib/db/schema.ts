import { InferSelectModel, relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import Skills from "../constants/Skills";

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
      job: (typeof Skills)["jobs"][number];
      yearsOfExperience: (typeof Skills)["yearsOfExperience"][number];
    }>("skills")
      .array()
      .notNull()
      .default(sql`ARRAY[]::jsonb[]`),
    cv: text("cv"),
  },
  (t) => ({
    userIdIdx: uniqueIndex("user_id_idx").on(t.id),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  companyOwners: many(companyOwners),
  jobApplicants: many(jobApplicants),
}));

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    name: text("name").notNull().unique(),
    email: text("email").notNull(),
    address: text("address").notNull(),
    about: text("about"),
  },
  (t) => ({
    companyIdIdx: uniqueIndex("company_id_idx").on(t.id),
  }),
);

export const companiesRelations = relations(companies, ({ many }) => ({
  companyOwners: many(companyOwners),
  jobs: many(jobs),
}));

export const companyOwners = pgTable(
  "company_owners",
  {
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.ownerId, t.companyId] }),
  }),
);

export const companyOwnersRelations = relations(companyOwners, ({ one }) => ({
  owner: one(users, {
    fields: [companyOwners.ownerId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [companyOwners.companyId],
    references: [companies.id],
  }),
}));

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    title: text("title").notNull(),
    position: text("position").notNull(),
    location: text("location").notNull(),
    type: jobTypeEnum("job_type").notNull(),
    salary: integer("salary").notNull(),
    requirements: customJsonb<{
      job: (typeof Skills)["jobs"][number];
      yearsOfExperience: (typeof Skills)["yearsOfExperience"][number];
    }>("requirements")
      .array()
      .notNull()
      .default(sql`ARRAY[]::jsonb[]`),
    description: text("description"),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id),
  },
  (t) => ({
    jobIdIdx: uniqueIndex("job_id_idx").on(t.id),
  }),
);

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  jobApplicants: many(jobApplicants),
}));

export const jobApplicants = pgTable(
  "job_applicants",
  {
    applicantId: text("applicant_id")
      .notNull()
      .references(() => users.id),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.applicantId, t.jobId] }),
    jobApplicantApplicantIdIdx: index("job_applicant_applicant_id_idx").on(
      t.applicantId,
    ),
    jobApplicantJobIdIdx: index("job_applicant_job_id_idx").on(t.jobId),
  }),
);

export const jobApplicantsRelations = relations(jobApplicants, ({ one }) => ({
  applicant: one(users, {
    fields: [jobApplicants.applicantId],
    references: [users.id],
  }),
  job: one(jobs, {
    fields: [jobApplicants.jobId],
    references: [jobs.id],
  }),
}));

export type User = InferSelectModel<typeof users>;
export type Company = InferSelectModel<typeof companies>;
export type CompanyOwner = InferSelectModel<typeof companyOwners>;
export type Job = InferSelectModel<typeof jobs>;
export type JobApplicant = InferSelectModel<typeof jobApplicants>;

export const UserSchema = createSelectSchema(users);
export const CompanySchema = createSelectSchema(companies);
export const CompanyOwnerSchema = createSelectSchema(companyOwners);
export const JobSchema = createSelectSchema(jobs);
export const JobApplicantSchema = createSelectSchema(jobApplicants);
