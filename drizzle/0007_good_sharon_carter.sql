ALTER TABLE "resumes" DROP CONSTRAINT "resumes_application_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes" ADD CONSTRAINT "resumes_application_fk" FOREIGN KEY ("user_id","job_id") REFERENCES "public"."applications"("user_id","job_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
