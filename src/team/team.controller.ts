import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('team')
@ApiTags('Teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  getTeams(): Promise<Team[]> {
    return this.teamService.getTeams();
  }

  @Get('/:id')
  getTeamById(@Param('id') id: number): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') id: number) {
    return this.teamService.deleteTeam(id);
  }

  @Patch('/:id')
  updateTeam(
    @Param('id') id: number,
    @Body() updateTeamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.teamService.updateTeam(id, updateTeamDto);
  }
}
