import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UserType } from './user-type.entity';

@Injectable()
export class UserTypeRepository extends Repository<UserType> {
  constructor(private dataSource: DataSource) {
    super(UserType, dataSource.createEntityManager());
  }

  async createUserType({
    name,
    description,
  }: CreateUserTypeDto): Promise<UserType> {
    const userType = this.create({
      name,
      description,
    });
    await this.save(userType);
    return userType;
  }
}
