CREATE TYPE "public"."roomStatus" AS ENUM('available', 'paid', 'unpaid', 'reserve', 'disable', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."userRoles" AS ENUM('customer', 'employee', 'admin', 'owner');--> statement-breakpoint
CREATE TYPE "public"."userSex" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"roomName" varchar(255) NOT NULL,
	"thumbnailImage" varchar(255),
	"images" text[10],
	"description" text,
	"facility" text[],
	"status" "roomStatus",
	"price" integer DEFAULT 0,
	"specialPrice" integer DEFAULT 0,
	"location" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"role" "userRoles" DEFAULT 'customer',
	"sex" "userSex" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
