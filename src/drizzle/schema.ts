import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  pgView,
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
  date,
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
export const invoiceStatus = pgEnum('invoice_status', [
  'valid',
  'invalid',
  'cancelled',
  'progress',
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
  owner_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => usersTable.id),
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
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  props: one(propsTable, {
    fields: [usersTable.id],
    references: [propsTable.owner_id],
  }),
}));
// export const propsRelations = relations(propsTable, ({ one }) => ({
//   rooms: one(roomsTable, {
//     fields: [propsTable.id],
//     references: [roomsTable.prop_id],
//   }),
// }));

export const roomsTable = pgTable('rooms', {
  id: uuid().primaryKey().defaultRandom(),
  prop_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => propsTable.id),
  owner_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => usersTable.id),
  contracts_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => contracts.id),
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
  id: uuid().primaryKey().defaultRandom(),
  room_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => roomsTable.id),
  owner_id: uuid()
    .default('00000000-0000-0000-0000-000000000000')
    .references(() => usersTable.id),
  customer_name: varchar(),
  customer_address: text(),
  customer_num: varchar(),
  amount: decimal(),
  status: invoiceStatus().default('progress'),
  payment_method: varchar(),
  invoice_num: varchar().unique(),
  issue_date: date().defaultNow(),
  due_date: date(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const contracts = pgTable('contracts', {
  id: uuid().primaryKey().defaultRandom(),
  room_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  // .references(() => roomsTable.id),
  owner_id: uuid().default('00000000-0000-0000-0000-000000000000'),
  // .references(() => usersTable.id),
  start_date: date().notNull(),
  end_date: date().notNull(),
  rent_amount: decimal().default('.0'),
  deposit_amount: decimal().default('0.0'),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const props_view = pgView('props_v').as((qb) => {
  return qb.select().from(propsTable);
});
