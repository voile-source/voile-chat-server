import { Result, User } from '../../constants';
import { Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(): void {
    this.userService.get();
  }

  @Post('login')
  login(): Result {
    return this.userService.login();
  }

  @Post('logout')
  logout(): Result {
    return this.userService.login();
  }
}
