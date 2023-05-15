import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserInfoVO } from './vo/login.vo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entitys/user.entity';
import { Result } from '../../constants';
import { success, error } from '../../utils/result-actions.util';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    const { phone } = registerDTO;
    const hasExist = await this.userRepository.query(
      `select * from user where phone='${phone}'`,
    );
    if (hasExist.length) {
      throw new NotFoundException('用户已存在');
    }
  }

  async register(registerDTO: RegisterDTO): Promise<Result> {
    await this.checkRegisterForm(registerDTO);
    const { name, password, phone } = registerDTO;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: User = new User();
    newUser.name = name;
    newUser.phone = phone;
    newUser.password = hashPassword;
    newUser.salt = salt;
    newUser.avatar =
      'https://volit.oss-cn-guangzhou.aliyuncs.com/image/wallhaven-6d5wjx_1280x1920.png';
    const res = await this.userRepository.save(newUser);
    if (res) {
      return success(null, '注册成功');
    }
    return error(null, '注册失败');
  }

  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { phone, password } = loginDTO;
    const users = await this.userRepository.query(
      `select * from user where phone=${phone}`,
    );
    if (users.length === 0) throw new NotFoundException('账号或密码错误');
    const hashPassword = encryptPassword(password, users[0].salt);
    if (users[0].password === hashPassword) {
      return users[0];
    }
    throw new NotFoundException('账号或密码错误');
  }

  // 生成 token
  async certificate(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<Result> {
    let user;
    try {
      user = await this.checkLoginForm(loginDTO);
    } catch (NotFoundException) {
      return error('账号或密码错误');
    }
    const token = await this.certificate(user);
    return success({ token });
  }

  async logout(): Promise<Result> {
    return success(null);
  }

  async getUserList(): Promise<Result> {
    const res = await this.userRepository.query('select * from user');
    return success(res);
  }

  async findByPhone(phone: string): Promise<Result> {
    const res = await this.userRepository.query(
      `select * from user where phone=${phone}`,
    );
    const newUser = new UserInfoVO(res[0]);
    return success(newUser, '获取用户信息成功');
  }

  test() {
    console.log('test');
  }
}
