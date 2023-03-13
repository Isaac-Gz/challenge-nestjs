import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('records')
@ApiTags('Records')
export class RecordsController {
  constructor(private recordService: RecordsService) {}

  @Get()
  getRecords(): Promise<Record[]> {
    return this.recordService.getRecords();
  }

  @Get('/:id')
  getRecordById(@Param('id') id: number): Promise<Record> {
    return this.recordService.getRecordById(id);
  }

  @Post()
  createRecord(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordService.createRecord(createRecordDto);
  }

  @Delete('/:id')
  deleteRecord(@Param('id') id: number) {
    return this.recordService.deleteRecord(id);
  }

  @Patch('/:id')
  updateRecord(
    @Param('id') id: number,
    @Body() updateRecordDto: CreateRecordDto,
  ): Promise<Record> {
    return this.recordService.updateRecord(id, updateRecordDto);
  }
}
