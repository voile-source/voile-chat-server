import { IsNotEmpty, IsString, Matches } from 'class-validator';

const regMobileCN = /1[3-9]d{9}/;

export class RegisterDTO {
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly phone: string;

  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly name: string;

  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
