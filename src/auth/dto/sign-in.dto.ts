import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'douter admin user name',
    example: 'admin',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Pass#123',
  })
  // @MinLength(8, {
  //   message: 'password too short',
  // })
  // @MaxLength(20, {
  //   message: 'password too long',
  // })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  @IsNotEmpty()
  readonly password: string;
}
