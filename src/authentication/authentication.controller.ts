import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './DTOs/register.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private AuthenticationService: AuthenticationService,
    private UserService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    const { email, password, confirmPassword } = body;
    if (password != confirmPassword) {
      throw new Error('Password and Confirm Password do not match');
    }
    const user = await this.UserService.findByEmail(email);
    if (user) {
      throw new Error('This email is already registered');
    }
    const hashedPassword = await this.AuthenticationService.hashPassword(
      password,
    );
    return await this.UserService.createUser({
      email,
      password: hashedPassword,
    });
  }
}
