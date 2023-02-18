import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
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

  async createUser({ email, password }) {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.usersRepository.persistAndFlush(user);
  }
}
