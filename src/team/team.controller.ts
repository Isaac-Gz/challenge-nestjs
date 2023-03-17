import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Version('1')
  @Get()
  getTeams(): Promise<Team[]> {
    return this.teamService.getTeams();
  }

  @Version('1')
  @Get('/:id')
  getTeamById(@Param('id') id: number): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @Version('1')
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Version('1')
  @Delete('/:id')
  deleteTeam(@Param('id') id: number) {
    return this.teamService.deleteTeam(id);
  }

  @Version('1')
  @Patch('/:id')
  updateTeam(
    @Param('id') id: number,
    @Body() updateTeamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.teamService.updateTeam(id, updateTeamDto);
  }
}
