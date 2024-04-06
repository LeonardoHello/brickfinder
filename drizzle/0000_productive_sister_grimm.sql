CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"text" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_id_idx" ON "posts" ("id");