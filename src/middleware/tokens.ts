import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JwtData } from '../authentication/authentication.types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    console.log(request.url);
    console.log(/auth\//.test(request.url));
    if (/auth\//.test(request.url)) return true;

    try {
      const token = request.headers.authorization.split(' ')[1];
      const { userId } = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
      ) as JwtData;
      if (typeof userId === 'string') return null;
      request.user = userId;
      return true;
    } catch (e) {
      throw new Error('Jwt token not valid');
    }
  }
}
