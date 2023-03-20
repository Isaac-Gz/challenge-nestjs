import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';
import { RecordRepository } from './records.repository';

@Injectable()
export class RecordsService {
  constructor(private readonly recordRepository: RecordRepository) {}

  async getRecords(): Promise<Record[]> {
    return await this.recordRepository.find();
  }

  async getRecordById(id: number): Promise<Record> {
    const found = await this.recordRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Record not found`);
    }
    return found;
  }

  createRecord(createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordRepository.createRecord(createRecordDto);
  }

  async deleteRecord(id: number): Promise<string> {
    const result = await this.recordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Record not found');
    }
    return 'Record deleted';
  }

  async updateRecord(
    id: number,
    {
      user_id,
      old_team_id,
      new_team_id,
      start_date,
      end_date,
    }: CreateRecordDto,
  ): Promise<Record> {
    const record = await this.getRecordById(id);

    record.user_id = user_id;
    record.old_team_id = old_team_id;
    record.new_team_id = new_team_id;
    record.start_date = start_date;
    record.end_date = end_date;

    await this.recordRepository.save(record);

    return record;
  }

  async getRecordsByUser(user_id: number): Promise<Record[]> {
    return await this.recordRepository.find({ where: { user_id } });
  }

  async getRecordsByOldTeam(old_team_id: number): Promise<Record[]> {
    return await this.recordRepository.find({ where: { old_team_id } });
  }

  async getRecordsByStartDate(start_date: string): Promise<Record[]> {
    return await this.recordRepository.find({ where: { start_date } });
  }

  async getRecordsByEndDate(end_date: string): Promise<Record[]> {
    return await this.recordRepository.find({ where: { end_date } });
  }
}
