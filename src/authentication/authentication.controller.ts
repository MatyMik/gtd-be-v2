import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './DTOs/register.dto';
import { UserService } from './user.service';
import { LoginDto } from './DTOs/login.dto';
import { JwtData } from './authentication.types';

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

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.UserService.findByEmail(email);
    if (!user) {
      throw new Error('"This email is not registered"');
    }
    const isPasswordValid = await this.AuthenticationService.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    const accessToken = this.AuthenticationService.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const refreshToken = this.AuthenticationService.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      '7d',
    );
    return { accessToken, refreshToken };
  }

  @Post('refresh')
  async refresh(@Headers() headers: any) {
    console.log(headers);
    const refreshToken = this.AuthenticationService.extractTokenFromHeader(
      headers.authorization,
    );
    console.log(refreshToken);
    const tokenData: JwtData = await this.AuthenticationService.verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const { userId } = tokenData;
    const user = await this.UserService.findById(userId);
    const accessToken = this.AuthenticationService.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const newRefreshToken = this.AuthenticationService.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      '7d',
    );
    return { accessToken, refreshToken: newRefreshToken, userId };
  }
}
