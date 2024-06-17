ALTER TABLE "applications" ALTER COLUMN "phone_number" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "phone_number" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "phone_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" text DEFAULT '' NOT NULL;