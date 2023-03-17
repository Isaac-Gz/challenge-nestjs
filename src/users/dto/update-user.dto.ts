import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  type_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  team_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  mail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  english_level: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tec_knowledge: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cv: string;
}
