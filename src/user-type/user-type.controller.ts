import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UserType } from './user-type.entity';
import { UserTypeService } from './user-type.service';

@Controller('user-type')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('User-type')
export class UserTypeController {
  constructor(private userTypeService: UserTypeService) {}

  @Version('1')
  @Get()
  getAllUserType(): Promise<UserType[]> {
    return this.userTypeService.getAllUserType();
  }

  @Version('1')
  @Get('/:id')
  async getOneUserType(@Param('id') id: number): Promise<UserType> {
    return this.userTypeService.getOneUserType(id);
  }

  @Version('1')
  @Post()
  createUserType(
    @Body() createUserTypeDto: CreateUserTypeDto,
  ): Promise<UserType> {
    return this.userTypeService.createUserType(createUserTypeDto);
  }
}
