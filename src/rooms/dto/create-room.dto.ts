import { ApiProperty } from '@nestjs/swagger';
import { PgUUIDBuilderInitial } from 'drizzle-orm/pg-core';
import { roomStatusType } from 'src/drizzle/schema';

export class CreateRoomDto {
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  ownerId: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  employeesId: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  customerId: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: 'room1' })
  roomName: string;
  @ApiProperty({ default: '' })
  thumbnailImage: string;
  @ApiProperty({ default: ['1', '2'] })
  images: string[];
  @ApiProperty({ default: '' })
  description: string;
  @ApiProperty({ default: ['1', '2'] })
  facility: string[];
  @ApiProperty({ enum: roomStatusType })
  status: roomStatusType;
  @ApiProperty({ default: 0.0 })
  price: number;
  @ApiProperty({ default: 0.0 })
  specialPrice: number;
  @ApiProperty({ default: '' })
  location: string;
}
