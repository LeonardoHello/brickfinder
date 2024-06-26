CREATE TABLE IF NOT EXISTS "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"user_id" text NOT NULL,
	"job_id" uuid NOT NULL,
	CONSTRAINT "resumes_key_unique" UNIQUE("key"),
	CONSTRAINT "resumes_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT "applications_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT "applications_job_id_jobs_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "application_id_idx";--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_job_id_pk" PRIMARY KEY("user_id","job_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes" ADD CONSTRAINT "resumes_application_fk" FOREIGN KEY ("user_id","job_id") REFERENCES "public"."applications"("user_id","job_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_user_id_idx" ON "applications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_job_id_idx" ON "applications" USING btree ("job_id");--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN IF EXISTS "resume";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "resume";