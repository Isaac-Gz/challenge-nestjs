import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UserType } from './user-type.entity';
import { UserTypeService } from './user-type.service';

@Controller('user-type')
export class UserTypeController {
  constructor(private userTypeService: UserTypeService) {}

  @Get()
  getAllUserType(): Promise<UserType[]> {
    return this.userTypeService.getAllUserType();
  }

  @Get('/:id')
  async getOneUserType(@Param('id') id: number): Promise<UserType> {
    return this.userTypeService.getOneUserType(id);
  }

  @Post()
  createUserType(
    @Body() createUserTypeDto: CreateUserTypeDto,
  ): Promise<UserType> {
    return this.userTypeService.createUserType(createUserTypeDto);
  }
}
