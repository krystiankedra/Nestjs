import { Module } from '@nestjs/common';
import { PrincipalsService } from './services/principals.service';
import { PrincipalsRepository } from './repository/principals.repository';
import { PrincipalsController } from './controllers/principals.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  controllers: [PrincipalsController],
  imports: [LoggerModule],
  providers: [PrincipalsService, PrincipalsRepository]
})
export class PrincipalsModule {}
