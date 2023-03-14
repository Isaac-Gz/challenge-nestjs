import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  account_name: string;

  @IsString()
  @IsNotEmpty()
  client_name: string;

  @IsString()
  @IsNotEmpty()
  in_charge_name: string;
}
