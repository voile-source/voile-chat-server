import { LoginDTO } from './dto/login.dto';
import { Result } from '../../constants';
import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<Result> {
    return await this.userService.login(loginDTO);
  }

  @Post('logout')
  logout(): Promise<Result> {
    return this.userService.logout();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async getUserInfo(@Req() request): Promise<Result> {
    const { phone } = request.user;
    return await this.userService.findByPhone(phone);
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<Result> {
    return this.userService.register(registerDTO);
  }

  @Get('userList')
  async getUserList(): Promise<Result> {
    return await this.userService.getUserList();
  }
}
