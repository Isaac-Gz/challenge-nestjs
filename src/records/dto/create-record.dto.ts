import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  old_team_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  new_team_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  end_date: string;
}
