import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    // return createRoomDto;
    try {
      const room = await this.db
        .insert(schema.roomsTable)
        .values(createRoomDto)
        .returning();
      return room;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const rooms = await this.db.query.roomsTable.findMany({});
      return rooms;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.db.query.roomsTable.findFirst({
        where: (rooms, { eq }) => eq(rooms.id, id),
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    try {
      return await this.db
        .update(schema.roomsTable)
        .set(updateRoomDto)
        .where(eq(schema.roomsTable.id, id))
        .returning();
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.db
        .delete(schema.roomsTable)
        .where(eq(schema.roomsTable.id, id))
        .returning();
    } catch (error) {
      return error;
    }
  }
}
