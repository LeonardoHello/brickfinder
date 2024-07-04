CREATE TABLE IF NOT EXISTS "user_resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "user_resumes_key_unique" UNIQUE("key"),
	CONSTRAINT "user_resumes_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "resumes" RENAME TO "application_resumes";--> statement-breakpoint
ALTER TABLE "application_resumes" DROP CONSTRAINT "resumes_key_unique";--> statement-breakpoint
ALTER TABLE "application_resumes" DROP CONSTRAINT "resumes_url_unique";--> statement-breakpoint
ALTER TABLE "application_resumes" DROP CONSTRAINT "resumes_application_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_resumes" ADD CONSTRAINT "user_resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_resumes" ADD CONSTRAINT "application_resumes_fk" FOREIGN KEY ("user_id","job_id") REFERENCES "public"."applications"("user_id","job_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "application_resumes" ADD CONSTRAINT "application_resumes_key_unique" UNIQUE("key");--> statement-breakpoint
ALTER TABLE "application_resumes" ADD CONSTRAINT "application_resumes_url_unique" UNIQUE("url");