import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.db
        .insert(schema.usersTable)
        .values(createUserDto)
        .returning();
      return user;
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.db.query.usersTable.findMany({});
  }

  async findOne(id: string) {
    return await this.db.query.usersTable.findFirst({
      where(user, { eq }) {
        return eq(user.id, id);
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.db
      .update(schema.usersTable)
      .set(updateUserDto)
      .where(eq(schema.usersTable.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.db
      .delete(schema.usersTable)
      .where(eq(schema.usersTable.id, id))
      .returning();
  }
}
