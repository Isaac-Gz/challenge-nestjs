import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

const mockTeamRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createTeam: jest.fn(),
  updateTeam: jest.fn(),
});

const mockTeam = {
  account_id: 1,
  name: 'name',
  description: 'description',
};

describe('TeamService', () => {
  let teamService: TeamService;
  let teamRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: TeamRepository, useFactory: mockTeamRepository },
      ],
    }).compile();

    teamService = module.get(TeamService);
    teamRepository = module.get(TeamRepository);
  });

  describe('getTeams', () => {
    it('calls TeamRepository.find and return the result', async () => {
      teamRepository.find.mockResolvedValue('someValue');
      const result = await teamService.getTeams();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTeamById', () => {
    it('calls TeamRepository.findOne and return the result', async () => {
      teamRepository.findOne.mockResolvedValue(mockTeam);
      const result = await teamService.getTeamById(0);
      expect(result).toEqual(mockTeam);
    });

    it('calls TeamRepository.findOne and hadle the error', async () => {
      teamRepository.findOne.mockResolvedValue(null);
      expect(teamService.getTeamById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTeam', () => {
    it('calls TeamRepository.createTeam and return the result', async () => {
      teamRepository.createTeam.mockResolvedValue(mockTeam);
      const result = await teamService.createTeam(mockTeam);
      expect(result).toEqual(mockTeam);
    });
  });
});
