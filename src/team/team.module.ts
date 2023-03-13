import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
})
export class TeamModule {}
