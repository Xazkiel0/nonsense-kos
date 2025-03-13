import * as dotenv from 'dotenv';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { join } from 'path';
import { Pool } from 'pg';

import * as schemas from './schema';
import { reset, seed } from 'drizzle-seed';

dotenv.config({
  path: join(process.cwd(), '.env.local'),
});

let db: NodePgDatabase<typeof schemas> | null = null;
const CONNECTION_STRING = process.env.POSTGRES_URL!;

(async () => {
  console.log(`Connecting to this URL:`, CONNECTION_STRING);

  const pool = new Pool({
    connectionString: CONNECTION_STRING,
  });

  db = drizzle(pool, {
    schema: {
      ...schemas,
    },
  });

  await seedAll();
})();

async function seedAll() {
  console.log('Start Seeding');

  await reset(db, schemas);

  await seed(db, {
    users: schemas.usersTable,
    props: schemas.propsTable,
    rooms: schemas.roomsTable,
    customers: schemas.customersTable,
    invoices: schemas.invoices,
    contracts: schemas.contracts,
  }).refine((f) => ({
    users: {
      count: 5,
      with: {
        props: 2,
      },
    },
    props: {
      columns: {
        address: f.streetAddress(),
        facility: f.valuesFromArray({
          values: ['a', 'b', 'c', 'd'],
          arraySize: 4,
        }),
        floor_count: f.int({ minValue: 1, maxValue: 10 }),
      },
    },
    rooms: {
      columns: {
        price: f.int({ minValue: 1, maxValue: 10 }),
        special_price: f.int({ minValue: 1, maxValue: 10 }),
      },
    },
  }));

  //   for (let i = 0; i < 10; i++) {
  //   const firstName = faker.person.firstName();
  //   let user = {
  //     name: firstName,
  //     username: faker.person.lastName(),
  //     email: faker.internet.email({ firstName }),
  //     password: '1234',
  //     role: faker.helpers.enumValue(schemas.userRolesType),
  //     sex: faker.helpers.enumValue(schemas.userSexType),
  //   };
  //   users.push(user)
  //   }
}
