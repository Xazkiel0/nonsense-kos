import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PgUUIDBuilderInitial } from 'drizzle-orm/pg-core';
import { roomStatusType } from 'src/drizzle/schema';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  owner_id: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  prop_id: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  contract_id: PgUUIDBuilderInitial<''>;
  @ApiProperty({ default: 'room1' })
  room_name: string;
  @ApiProperty({ default: '' })
  thumbnail_image: string;
  @ApiProperty({ default: ['1', '2'] })
  images: string[];
  @ApiProperty({ default: '' })
  description: string;
  @ApiProperty({ example: 'single' })
  occupancy_status: 'single';
  @ApiProperty({ enum: roomStatusType })
  status: roomStatusType;
  @ApiProperty({ default: 0.0 })
  price: number;
  @ApiProperty({ default: 0.0 })
  special_price: number;
}
