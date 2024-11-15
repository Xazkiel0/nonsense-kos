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
  numeric,
  integer,
  time,
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
  email: varchar({ length: 255 }),
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
export const propsTable = pgTable('props', {
  id: uuid().primaryKey().defaultRandom(),
  owner_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  employees_id: uuid()
    .array()
    .default(['00000000-0000-0000-0000-000000000000']),
  name: varchar().notNull(),
  address: text().notNull(),
  facility: text().array().default(['1', '2']),
  thumbnail_image: varchar({ length: 255 }),
  images: text().array().default(['1', '2']),
  floor_count: integer().default(1),
  description: text(),
  services: text(),
})
export const roomsTable = pgTable('rooms', {
  id: uuid().primaryKey().defaultRandom(),
  prop_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  owner_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  invoice_id: uuid(),
  room_name: varchar({ length: 255 }).notNull(),
  thumbnail_image: varchar({ length: 255 }),
  images: text().array().default(['1', '2']),
  description: text(),
  occupancy_status: occupancyStatus(),
  status: roomStatus(),
  price: decimal().default('.0'),
  special_price: decimal().default('0.0'),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const invoices = pgTable('invoices', {
  id: uuid().default('00000000-0000-0000-0000-000000000000'),
  room_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  owner_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  customer_name: varchar(),
  customer_address: text(),
  customer_num: varchar(),
  bills: decimal(),
  payment_method: varchar(),
  end_contract: time(),
  invoice_num: varchar(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow()
});
