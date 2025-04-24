import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    description: 'Username (unique)',
    default: 'solih',
  })
  username: string;

  @ApiProperty({
    description: 'Password (must be strong)',
    default: 'User#154',
  })
  password: string;
}
