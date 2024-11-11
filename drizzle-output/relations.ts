import { relations } from "drizzle-orm/relations";
import { users, rooms } from "./schema";

export const roomsRelations = relations(rooms, ({one}) => ({
	user_ownerId: one(users, {
		fields: [rooms.ownerId],
		references: [users.id],
		relationName: "rooms_ownerId_users_id"
	}),
	user_customerId: one(users, {
		fields: [rooms.customerId],
		references: [users.id],
		relationName: "rooms_customerId_users_id"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	rooms_ownerId: many(rooms, {
		relationName: "rooms_ownerId_users_id"
	}),
	rooms_customerId: many(rooms, {
		relationName: "rooms_customerId_users_id"
	}),
}));