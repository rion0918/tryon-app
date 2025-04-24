import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//jwtはこの人はログイン済みですよ、という情報を持っている
//jwtはサーバー側で保存しないので、トークンを持っている人はログイン済み

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // 環境変数で管理推奨
    });
  }

  async validate(payload: { userId: number; email: string }) {
    return payload; // @CurrentUser() で使えるようになる
  }
}
