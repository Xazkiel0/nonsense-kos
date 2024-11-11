import { pgTable, unique, uuid, varchar, timestamp, foreignKey, text, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const roomStatus = pgEnum("roomStatus", ['available', 'paid', 'unpaid', 'reserve', 'disable', 'maintenance'])
export const userRoles = pgEnum("userRoles", ['customer', 'employee', 'admin', 'owner'])
export const userSex = pgEnum("userSex", ['male', 'female'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).notNull(),
	role: userRoles().default('customer'),
	sex: userSex().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});

export const rooms = pgTable("rooms", {
	id: uuid().primaryKey().notNull(),
	roomName: varchar({ length: 255 }).notNull(),
	thumbnailImage: varchar({ length: 255 }),
	images: text().array(),
	description: text(),
	facility: text().array(),
	status: roomStatus(),
	price: integer().default(0),
	specialPrice: integer().default(0),
	location: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	ownerId: uuid(),
	customerId: uuid(),
	employeesId: uuid(),
}, (table) => {
	return {
		roomsOwnerIdUsersIdFk: foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "rooms_ownerId_users_id_fk"
		}),
		roomsCustomerIdUsersIdFk: foreignKey({
			columns: [table.customerId],
			foreignColumns: [users.id],
			name: "rooms_customerId_users_id_fk"
		}),
	}
});
