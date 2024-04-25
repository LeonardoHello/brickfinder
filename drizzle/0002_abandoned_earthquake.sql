ALTER TABLE "users" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "skills" jsonb[] DEFAULT ARRAY[]::jsonb[];--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cv" text;