import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/connection';
import { UserTypeModule } from './user-type/user-type.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.host,
      port: 3306,
      username: 'root',
      password: 'lC140822',
      database: 'challenge',
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
    }),
    AccountsModule,
    UserTypeModule,
    TeamModule,
    AuthModule,
    RecordsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
