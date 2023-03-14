import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  old_team_id: number;

  @IsNumber()
  @IsNotEmpty()
  new_team_id: number;

  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  end_date: string;
}
