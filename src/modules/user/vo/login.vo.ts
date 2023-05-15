import { User } from 'src/entitys/user.entity';
export class UserInfoVO {
  id: number;
  name: string;
  avatar: string;
  phone: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.avatar = user.avatar;
    this.phone = user.phone;
  }
}
