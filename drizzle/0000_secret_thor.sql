CREATE TABLE IF NOT EXISTS "spellbooks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spells" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"image" varchar NOT NULL,
	"spellbook_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spells" ADD CONSTRAINT "spells_spellbook_id_spellbooks_id_fk" FOREIGN KEY ("spellbook_id") REFERENCES "spellbooks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
