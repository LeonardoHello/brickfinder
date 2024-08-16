ALTER TABLE "application_resumes" RENAME TO "resumes";--> statement-breakpoint
ALTER TABLE "resumes" RENAME COLUMN "key" TO "fullPath";--> statement-breakpoint
ALTER TABLE "user_resumes" RENAME COLUMN "key" TO "fullPath";--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "application_resumes_key_unique";--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "application_resumes_url_unique";--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "application_resumes_user_id_job_id_unique";--> statement-breakpoint
ALTER TABLE "user_resumes" DROP CONSTRAINT "user_resumes_key_unique";--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "application_resumes_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes" ADD CONSTRAINT "application_resumes_fk" FOREIGN KEY ("user_id","job_id") REFERENCES "public"."applications"("user_id","job_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_fullPath_unique" UNIQUE("fullPath");--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_job_id_unique" UNIQUE("user_id","job_id");--> statement-breakpoint
ALTER TABLE "user_resumes" ADD CONSTRAINT "user_resumes_fullPath_unique" UNIQUE("fullPath");