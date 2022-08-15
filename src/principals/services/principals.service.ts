import { Injectable } from '@nestjs/common';
import { PrincipalsRepository } from '../repository/principals.repository';

@Injectable()
export class PrincipalsService {
  constructor(private principalsRepository: PrincipalsRepository) {}

  findAll() {
    return this.principalsRepository.findAll();
  }
}
