ALTER TABLE "application_resumes" ADD CONSTRAINT "application_resumes_user_id_job_id_unique" UNIQUE("user_id","job_id");