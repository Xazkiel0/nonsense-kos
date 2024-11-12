import { ApiProperty } from '@nestjs/swagger';
import { userRoles, userRolesType, userSexType } from 'src/drizzle/schema';

export class CreateUserDto {
  @ApiProperty({ example: 'user@ex.com' })
  email: Required<string>;
  @ApiProperty({ default: 'user' })
  username: string;
  @ApiProperty({ default: 'user' })
  name: string;
  @ApiProperty({ default: 'password' })
  password: string;

  @ApiProperty({
    name: 'role',
    enum: userRolesType,
    default: userRolesType.customer,
  })
  role: userRolesType;

  @ApiProperty({ enum: userSexType })
  sex: userSexType;
}
