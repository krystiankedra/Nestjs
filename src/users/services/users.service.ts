import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });
    return this.repository.save(user);
  }

  findOne(id: number) {
    return this.getUserById(id);
  }

  find(email: string) {
    return this.repository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.getUserById(id);
    return this.repository.save({ ...user, ...attrs });
  }

  async remove(id: number) {
    const user = await this.getUserById(id);
    return this.repository.remove(user);
  }

  private async getUserById(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
