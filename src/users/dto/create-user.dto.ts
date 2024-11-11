import { ApiProperty } from '@nestjs/swagger';
import { userRoles, userRolesType, userSexType } from 'src/drizzle/schema';

export class CreateUserDto {
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

  @ApiProperty({ enum: userSexType })
  sex: userSexType;
}
