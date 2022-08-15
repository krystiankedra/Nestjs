import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session');
import { MessagesModule } from '../messages/messages.module';
import { PrincipalsModule } from '../principals/principals.module';
import { Report } from '../reports/entity/report.entity';
import { ReportsModule } from '../reports/reports.module';
import { User } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true
      })
    }),
    PrincipalsModule,
    MessagesModule,
    ReportsModule,
    UsersModule,
    ReportsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ]
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')]
        })
      )
      .forRoutes('*');
  }
}
