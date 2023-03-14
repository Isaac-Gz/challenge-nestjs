import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  type_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  english_level: string;

  @IsNotEmpty()
  tec_knowledge: string;

  @IsNotEmpty()
  cv: string;
}
