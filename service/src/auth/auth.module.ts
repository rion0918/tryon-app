import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    PrismaService,
    JwtStrategy,
    GqlAuthGuard,
  ],
})
export class AuthModule {}
