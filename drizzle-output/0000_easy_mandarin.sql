CREATE TYPE "public"."invoice_status" AS ENUM('valid', 'invalid', 'cancelled', 'progress');--> statement-breakpoint
CREATE TYPE "public"."occupancy_status" AS ENUM('double_male', 'double_female', 'single', 'married', 'special');--> statement-breakpoint
CREATE TYPE "public"."room_status" AS ENUM('available', 'paid', 'unpaid', 'reserve', 'disable', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('customer', 'employee', 'admin', 'owner');--> statement-breakpoint
CREATE TYPE "public"."user_sex" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"owner_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"rent_amount" numeric DEFAULT '.0',
	"deposit_amount" numeric DEFAULT '0.0',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"sex" "user_sex" NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"owner_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"customer_name" varchar,
	"customer_address" text,
	"customer_num" varchar,
	"amount" numeric,
	"status" "invoice_status" DEFAULT 'progress',
	"payment_method" varchar,
	"invoice_num" varchar,
	"issue_date" date DEFAULT now(),
	"due_date" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "invoices_invoice_num_unique" UNIQUE("invoice_num")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "props" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"employees_id" uuid[] DEFAULT '{"00000000-0000-0000-0000-000000000000"}',
	"name" varchar NOT NULL,
	"address" text NOT NULL,
	"facility" text[] DEFAULT '{"1","2"}',
	"thumbnail_image" varchar(255),
	"images" text[] DEFAULT '{"1","2"}',
	"floor_count" integer DEFAULT 1,
	"description" text,
	"services" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prop_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"owner_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"contracts_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"room_name" varchar(255) NOT NULL,
	"thumbnail_image" varchar(255),
	"images" text[] DEFAULT '{"1","2"}',
	"description" text,
	"occupancy_status" "occupancy_status",
	"status" "room_status",
	"price" numeric DEFAULT '.0',
	"special_price" numeric DEFAULT '0.0',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" varchar(255) DEFAULT 'password' NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"role" "user_roles" DEFAULT 'customer',
	"sex" "user_sex" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
