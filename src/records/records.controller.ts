import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('records')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Records')
export class RecordsController {
  constructor(private recordService: RecordsService) {}

  @Version('1')
  @Get()
  getRecords(): Promise<Record[]> {
    return this.recordService.getRecords();
  }

  @Version('1')
  @Get('/:id')
  getRecordById(@Param('id') id: number): Promise<Record> {
    return this.recordService.getRecordById(id);
  }

  @Version('1')
  @Post()
  createRecord(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordService.createRecord(createRecordDto);
  }

  @Version('1')
  @Delete('/:id')
  deleteRecord(@Param('id') id: number) {
    return this.recordService.deleteRecord(id);
  }

  @Version('1')
  @Patch('/:id')
  updateRecord(
    @Param('id') id: number,
    @Body() updateRecordDto: CreateRecordDto,
  ): Promise<Record> {
    return this.recordService.updateRecord(id, updateRecordDto);
  }

  @Version('2')
  @Get('/user/:id')
  getRecordByUser(@Param('id') id: number): Promise<Record[]> {
    return this.recordService.getRecordsByUser(id);
  }

  @Version('2')
  @Get('/old_team/:id')
  getRecordByOldTeam(@Param('id') id: number): Promise<Record[]> {
    return this.recordService.getRecordsByOldTeam(id);
  }

  @Version('2')
  @Get('/start_date/:date')
  getRecordByStartDate(@Param('date') date: string): Promise<Record[]> {
    return this.recordService.getRecordsByStartDate(date);
  }

  @Version('2')
  @Get('/end_date/:date')
  getRecordByEndDate(@Param('date') date: string): Promise<Record[]> {
    return this.recordService.getRecordsByEndDate(date);
  }
}
