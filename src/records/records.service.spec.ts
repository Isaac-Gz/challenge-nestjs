import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RecordRepository } from './records.repository';
import { RecordsService } from './records.service';

const mockRecordRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createRecord: jest.fn(),
  delete: jest.fn(),
});

const mockRecord = {
  user_id: 1,
  old_team_id: 1,
  new_team_id: 2,
  start_date: '15/10/2022',
  end_date: '20/10/2022',
};

describe('RecordService', () => {
  let recordService: RecordsService;
  let recordRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecordsService,
        { provide: RecordRepository, useFactory: mockRecordRepository },
      ],
    }).compile();

    recordService = module.get(RecordsService);
    recordRepository = module.get(RecordRepository);
  });

  describe('getRecords', () => {
    it('calls RecordRepository.find and returns the result ', async () => {
      recordRepository.find.mockResolvedValue('someValue');
      const result = await recordService.getRecords();
      expect(result).toEqual('someValue');
    });
  });

  describe('getRecordById', () => {
    it('calls RecordRepository.findOne and returns the result', async () => {
      recordRepository.findOne.mockResolvedValue(mockRecord);
      const result = await recordService.getRecordById(0);
      expect(result).toEqual(mockRecord);
    });

    it('calls RecordRepository.findOne and hangle the error', async () => {
      recordRepository.findOne.mockResolvedValue(null);
      expect(recordService.getRecordById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createRecord', () => {
    it('calls RecordRepository.createRecord and returns the result', async () => {
      recordRepository.createRecord.mockResolvedValue(mockRecord);
      const result = await recordService.createRecord(mockRecord);
      expect(result).toEqual(mockRecord);
    });
  });

  describe('deleteRecord', () => {
    it('calls RecordRepository.deleteRecord and return the result', async () => {
      recordRepository.delete.mockResolvedValue({ affected: 1 });
      const result = recordService.deleteRecord(0);
      expect(result).resolves.toBe('Record deleted');
    });
  });
});
