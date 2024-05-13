DO $$ BEGIN
 CREATE TYPE "public"."job_type" AS ENUM('Full-time', 'Part-time', 'Contract', 'Temporary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"about" text,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_owners" (
	"owner_id" text NOT NULL,
	"company_id" uuid NOT NULL,
	CONSTRAINT "company_owners_owner_id_company_id_pk" PRIMARY KEY("owner_id","company_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_applicants" (
	"applicant_id" text NOT NULL,
	"job_id" uuid NOT NULL,
	CONSTRAINT "job_applicants_applicant_id_job_id_pk" PRIMARY KEY("applicant_id","job_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"title" text NOT NULL,
	"position" text NOT NULL,
	"location" text NOT NULL,
	"job_type" "job_type" NOT NULL,
	"salary" integer NOT NULL,
	"requirements" jsonb[] DEFAULT ARRAY[]::jsonb[] NOT NULL,
	"description" text,
	"company_id" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "posts";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_owners" ADD CONSTRAINT "company_owners_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_owners" ADD CONSTRAINT "company_owners_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_applicant_id_users_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_id_idx" ON "companies" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "job_applicant_applicant_id_idx" ON "job_applicants" ("applicant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "job_applicant_job_id_idx" ON "job_applicants" ("job_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "job_id_idx" ON "jobs" ("id");