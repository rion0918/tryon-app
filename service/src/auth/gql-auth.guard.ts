import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

//AuthGuardは、リクエストが来たときに、jwtトークンがあるかどうかをチェックする
//jwtトークンがあれば、リクエストを通す
//jwtトークンがなければ、401エラーを返す
//jwtトークンがあっても、ユーザーが存在しなければ、401エラーを返す
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
