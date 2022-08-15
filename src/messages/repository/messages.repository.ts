import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  private async readRepositoryFile() {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async findOne(id: string) {
    const messages = await this.readRepositoryFile();
    return messages[id];
  }

  async findAll() {
    const messages = await this.readRepositoryFile();
    return messages;
  }

  async create(content: string) {
    const messages = await this.readRepositoryFile();
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
