import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeModule } from './user-type/user-type.module';
import { TeamModule } from './team/team.module';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          synchronize: true,
          dropSchema: false,
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AccountsModule,
    UserTypeModule,
    TeamModule,
    RecordsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
