import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  createLog(log: string) {
    console.log(log);
  }
}
