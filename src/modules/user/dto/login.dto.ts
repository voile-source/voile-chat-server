import { IsNotEmpty, Matches } from 'class-validator';

const regMobileCN = /1[3-9]d{9}/;

export class LoginDTO {
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly phone: string;

  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
