import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeController } from './user-type.controller';
import { UserType } from './user-type.entity';
import { UserTypeRepository } from './user-type.repository';
import { UserTypeService } from './user-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService, UserTypeRepository],
})
export class UserTypeModule {}
