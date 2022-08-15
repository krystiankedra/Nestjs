import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { LoggerService } from '../../logger/services/logger.services';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { MessagesService } from '../services/messages.service';

@Injectable()
@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessagesService,
    private loggerService: LoggerService
  ) {}

  @Get()
  async getMessages() {
    this.loggerService.createLog('Started getMessages');
    const messages = await this.messageService.findAll();
    this.loggerService.createLog(`Messages: ${JSON.stringify(messages)}`);
    return messages;
  }

  @Post()
  createMessage(@Body() { content }: CreateMessageDto) {
    return this.messageService.create(content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }
}
