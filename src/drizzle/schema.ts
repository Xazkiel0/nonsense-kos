import { sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  uuid,
  pgEnum,
  timestamp,
  text,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core';

export enum roomStatusType {
  available = 'available',
  paid = 'paid',
  unpaid = 'unpaid',
  reserve = 'reserve',
  disable = 'disable',
  maintenance = 'maintenance',
}
export const roomStatus = pgEnum('room_status', [
  roomStatusType.available,
  roomStatusType.paid,
  roomStatusType.unpaid,
  roomStatusType.reserve,
  roomStatusType.disable,
  roomStatusType.maintenance,
]);
export enum userRolesType {
  customer = 'customer',
  employee = 'employee',
  admin = 'admin',
  owner = 'owner',
}
export enum userSexType {
  male = 'male',
  female = 'female',
}
export const userRoles = pgEnum('user_roles', [
  userRolesType.customer,
  userRolesType.employee,
  userRolesType.admin,
  userRolesType.owner,
]);
export const userSex = pgEnum('user_sex', [
  userSexType.male,
  userSexType.female,
]);
export const occupancyStatus = pgEnum('occupancy_status', [
  'double_male',
  'double_female',
  'single',
  'married',
  'special',
]);

export const customersTable = pgTable('customers', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  sex: userSex().notNull(),
  phone_number: varchar({ length: 255 }).notNull(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull().default('password'),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull().unique(),
  role: userRoles().default(userRolesType.customer),

  sex: userSex().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const roomsTable = pgTable('rooms', {
  id: uuid().primaryKey().defaultRandom(),
  ownerId: uuid().default('00000000-0000-0000-0000-000000000000'),
  // employeesId: uuid().array(),
  customerId: uuid().default('00000000-0000-0000-0000-000000000000'),
  roomName: varchar({ length: 255 }).notNull(),
  thumbnailImage: varchar({ length: 255 }),
  images: text().array().default(['1', '2']),
  description: text(),
  facility: text().array().default(['1', '2']),
  occupancy_status: occupancyStatus(),
  status: roomStatus(),
  price: decimal().default('.0'),
  specialPrice: decimal().default('0.0'),
  location: text(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

// export const p
