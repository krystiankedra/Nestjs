import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MessagesRepository } from './repository/messages.repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
  controllers: [MessagesController],
  imports: [LoggerModule],
  providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}
