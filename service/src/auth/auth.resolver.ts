import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthOutput } from './dto/auth.output';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthOutput)
  async signup(@Args('input') input: SignupInput): Promise<AuthOutput> {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthOutput> {
    return this.authService.login(input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  getProfile(@CurrentUser() user: { email: string }): string {
    return `Your email is ${user.email}`;
  }
}
