import { IsNotEmpty } from 'class-validator';
export class CreateAccountDto {
  @IsNotEmpty()
  account_name: string;

  @IsNotEmpty()
  client_name: string;

  @IsNotEmpty()
  in_charge_name: string;
}
