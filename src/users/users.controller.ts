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
}
