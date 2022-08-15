import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class PrincipalsRepository {
  private async readRepositoryFile() {
    const contents = await readFile('principals.json', 'utf-8');
    const principals = JSON.parse(contents);
    return principals;
  }

  async findAll() {
    const principals = await this.readRepositoryFile();
    return principals;
  }
}
