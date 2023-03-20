import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  createUser: jest.fn(),
});

const mockUser = {
  type_id: 1,
  team_id: 0,
  name: 'name',
  mail: 'mail',
  password: 'password',
  english_level: 'english_level',
  tec_knowledge: 'tec_knowledge',
  cv: 'cv',
};

describe('UserService', () => {
  let userService: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get(UsersService);
    userRepository = module.get(UserRepository);
  });

  describe('getUsers', () => {
    it('calls UserRepository.find returns the result', async () => {
      userRepository.find.mockResolvedValue('someValue');
      const result = await userService.getUsers();
      expect(result).toEqual('someValue');
    });
  });

  describe('getUserById', () => {
    it('calls UserRepository.findOne and returns the result', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await userService.getUserById(0);
      expect(result).toEqual(mockUser);
    });

    it('calls UserRepository.findOne and handle the error', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.getUserById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('calls UserRepository.createUser and return the result', async () => {
      userRepository.createUser.mockResolvedValue(mockUser);
      const result = await userService.createUser(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('calls UserRepository.deleteUser and return the result', async () => {
      userRepository.delete.mockResolvedValue({ affected: 1 });
      const result = userService.deleteUser(0);
      expect(result).resolves.toBe('User deleted');
    });
  });

  describe('getUserByName', () => {
    it('calls UserRepository.findOne and returns the result', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await userService.getUserByName('name');
      expect(result).toEqual(mockUser);
    });

    it('calls UserRepository.findOne and handle the error', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.getUserByName('name')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
