import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/connection';
import { UserTypeModule } from './user_type/user_type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.host,
      port: 3306,
      username: 'root',
      password: 'lC140822',
      database: 'challenge',
      synchronize: true,
      dropSchema: true,
      autoLoadEntities: true,
    }),
    UserTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
