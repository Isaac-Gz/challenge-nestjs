import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async getTeams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async getTeamById(id: number): Promise<Team> {
    const found = await this.teamRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return found;
  }

  createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamRepository.createTeam(createTeamDto);
  }

  async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
  }

  async updateTeam(
    id: number,
    { account_id, name, description }: CreateTeamDto,
  ): Promise<Team> {
    const team = await this.getTeamById(id);

    team.account_id = account_id;
    team.name = name;
    team.description = description;

    await this.teamRepository.save(team);

    return team;
  }
}
