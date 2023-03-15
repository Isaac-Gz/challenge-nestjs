import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  mail: string;
}
