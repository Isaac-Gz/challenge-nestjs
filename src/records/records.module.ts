import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordRepository } from './records.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), AuthModule],
  providers: [RecordsService, RecordRepository],
  controllers: [RecordsController],
})
export class RecordsModule {}
