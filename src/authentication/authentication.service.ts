import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtData } from './authentication.types';

@Injectable()
export class AuthenticationService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(user: User, secret: string, expiresIn = '1h') {
    const data = {
      time: Date(),
      userId: user.id,
    };

    return jwt.sign(data, secret, { expiresIn });
  }

  async verifyToken(token: string, secret: string) {
    const data = (await jwt.verify(token, secret)) as JwtData;
    return data;
  }

  extractTokenFromHeader = (authorizationHeader: string) => {
    const token = authorizationHeader.split(' ')[1];
    return token;
  };
}
