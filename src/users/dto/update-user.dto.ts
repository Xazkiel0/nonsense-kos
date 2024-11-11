import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { userRolesType, userSexType } from 'src/drizzle/schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ default: 'user@ex.com' })
  email: Required<string>;
  @ApiProperty({ default: 'user' })
  username: string;
  @ApiProperty({ default: 'user' })
  name: string;
  @ApiProperty({
    name: 'role',
    enum: userRolesType,
    default: userRolesType.customer,
  })
  role: userRolesType;
  @ApiProperty({
    enum: userSexType,
  })
  sex: userSexType;
}
