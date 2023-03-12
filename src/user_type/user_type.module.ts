import { Module } from '@nestjs/common';
import { UserTypeController } from './user_type.controller';

@Module({
  controllers: [UserTypeController],
})
export class UserTypeModule {}
