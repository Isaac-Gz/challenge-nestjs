import { UserTypeRepository } from './user-type.repository';
import { UserTypeService } from './user-type.service';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common/exceptions';

const mockUserTypeRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createUserType: jest.fn(),
  updateUserType: jest.fn(),
});

const mockUserType = {
  name: 'name',
  description: 'description',
};

describe('UserTypeService', () => {
  let userTypeService: UserTypeService;
  let userTypeRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserTypeService,
        { provide: UserTypeRepository, useFactory: mockUserTypeRepository },
      ],
    }).compile();
    userTypeService = module.get(UserTypeService);
    userTypeRepository = module.get(UserTypeRepository);
  });

  describe('getAllUserType', () => {
    it('calls UserTypeRepository.find and returns the result', async () => {
      userTypeRepository.find.mockResolvedValue('someValue');
      const result = await userTypeService.getAllUserType();
      expect(result).toEqual('someValue');
    });
  });

  describe('getOneUserType', () => {
    it('calls UserTypeRepository.findOne and return the result', async () => {
      userTypeRepository.findOne.mockResolvedValue(mockUserType);
      const result = await userTypeService.getOneUserType(0);
      expect(result).toEqual(mockUserType);
    });

    it('calls UserTypeRepository.findOne and handle the error', async () => {
      userTypeRepository.findOne.mockResolvedValue(null);
      expect(userTypeService.getOneUserType(0)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUserType', () => {
    it('calls UserTypeRepository.createUserType and returns the result', async () => {
      userTypeRepository.createUserType.mockResolvedValue(mockUserType);
      const result = await userTypeService.createUserType(mockUserType);
      expect(result).toEqual(mockUserType);
    });
  });
});
