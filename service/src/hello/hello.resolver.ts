import { Query, Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello, world!';
  }

  @Mutation(() => String)
  sayHello(): string {
    return 'Mutation: Hello!';
  }
}
