ALTER TABLE "jobs" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "requirements" text NOT NULL;