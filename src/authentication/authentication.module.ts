import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService],
})
export class AuthenticationModule {}
