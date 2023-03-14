import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  account_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  client_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  in_charge_name: string;
}
