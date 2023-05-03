import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Result, User as UserDTO } from '../../constants';
import { success } from './../../utils/result-actions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  login(): Result<UserDTO> {
    return success();
  }

  logout(): Result<null> {
    return success(null);
  }

  async get(): Promise<null> {
    const res = await this.userRepository.find();
    console.log(res);
    return;
  }
}
