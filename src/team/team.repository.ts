import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(private dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async createTeam({
    account_id,
    name,
    description,
  }: CreateTeamDto): Promise<Team> {
    const team = this.create({
      account_id,
      name,
      description,
    });
    await this.save(team);
    return team;
  }
}
