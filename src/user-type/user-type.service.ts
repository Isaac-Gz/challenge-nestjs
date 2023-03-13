import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UserType } from './user-type.entity';
import { UserTypeRepository } from './user-type.repository';

@Injectable()
export class UserTypeService {
  constructor(private readonly userTypeRepository: UserTypeRepository) {}

  async getAllUserType(): Promise<UserType[]> {
    return await this.userTypeRepository.find();
  }

  async getOneUserType(id: number): Promise<UserType> {
    const found = await this.userTypeRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  createUserType(createUserType: CreateUserTypeDto): Promise<UserType> {
    return this.userTypeRepository.createUserType(createUserType);
  }
}
