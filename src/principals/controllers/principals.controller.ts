import { Controller, Get, Injectable } from '@nestjs/common';
import { LoggerService } from '../../logger/services/logger.services';
import { PrincipalsService } from '../services/principals.service';

@Injectable()
@Controller('principals')
export class PrincipalsController {
  constructor(
    private principalsService: PrincipalsService,
    private loggerService: LoggerService
  ) {}

  @Get()
  async getPrincipals() {
    this.loggerService.createLog('Started getPrincipals');
    const principals = await this.principalsService.findAll();
    this.loggerService.createLog(`Messages: ${JSON.stringify(principals)}`);
    return principals;
  }
}
