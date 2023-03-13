import { IsNotEmpty } from 'class-validator';
export class CreateRecordDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  old_team_id: number;

  @IsNotEmpty()
  new_team_id: number;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;
}
