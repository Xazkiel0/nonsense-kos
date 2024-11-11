ALTER TABLE "rooms" DROP CONSTRAINT "rooms_employeesId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "employeesId";