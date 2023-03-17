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
import { CreateUserDto } from './dto/create-user.dto';
import { UserMailDto } from './dto/get-user-mail.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Version('1')
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Version('2')
  @Get('testv2')
  getVersion2() {
    return 'v2';
  }

  @Version('1')
  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Version('2')
  @Post('/mail')
  getUserByMail(@Body() userMailDto: UserMailDto): Promise<User> {
    return this.userService.getUserByMail(userMailDto);
  }

  @Version('1')
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Version('1')
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Version('1')
  @Patch('/:id')
  updateRecord(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Version('2')
  @Get('/name/:name')
  getUserByName(@Param('name') name: string): Promise<User> {
    return this.userService.getUserByName(name);
  }

  @Version('2')
  @Patch('/team_id/:id/:team')
  updateTeam(
    @Param('id') id: number,
    @Param('team') team: number,
  ): Promise<User> {
    return this.userService.updateTeam(id, team);
  }

  @Version('2')
  @Patch('/normal/:id')
  updateNormalUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateNormalUser(id, updateUserDto);
  }
}
