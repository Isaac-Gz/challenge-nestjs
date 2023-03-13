import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordsService, RecordRepository],
  controllers: [RecordsController],
})
export class RecordsModule {}
