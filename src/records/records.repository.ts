import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordRepository extends Repository<Record> {
  constructor(private dataSource: DataSource) {
    super(Record, dataSource.createEntityManager());
  }

  async createRecord({
    user_id,
    old_team_id,
    new_team_id,
    start_date,
    end_date,
  }: CreateRecordDto): Promise<Record> {
    const record = this.create({
      user_id,
      old_team_id,
      new_team_id,
      start_date,
      end_date,
    });

    try {
      await this.save(record);
      return record;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
