import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthOutput } from './dto/auth.output';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  // サインアップ処理
  async signup(input: SignupInput): Promise<AuthOutput> {
    const { email, password } = input;

    //メールアドレスの重複チェック
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('このメールアドレスは既に使用されています');
    }

    //パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    //ユーザー作成後、JWTトークンを発行
    const token = this.jwt.sign({ userId: user.id, email: user.email });
    return { accessToken: token };
  }

  // ログイン処理
  async login(input: LoginInput): Promise<AuthOutput> {
    const { email, password } = input;

    //該当するユーザーをDBから取得
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('ユーザーが見つかりません');
    }

    //パスワードを比較（ハッシュと照合）
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    //成功したらJWTトークンを発行して返す
    const token = this.jwt.sign({ userId: user.id, email: user.email });
    return { accessToken: token };
  }
}
