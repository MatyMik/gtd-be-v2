import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository?: EntityRepository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ id });
  }

  async createUser({ email, password }) {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
