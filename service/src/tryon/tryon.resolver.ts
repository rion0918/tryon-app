import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TryOnInput } from './dto/tryon.input';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TryOnService } from './tryon.service';
import { TryOn } from './dto/tryon.model';

@Resolver(() => TryOn)
export class TryOnResolver {
  constructor(private tryOnService: TryOnService) {}

  @Mutation(() => String, { name: 'tryOnClothes' })
  @UseGuards(GqlAuthGuard)
  async tryOnClothes(
    @Args('input') input: TryOnInput,
    @CurrentUser() user: { userId: number },
  ): Promise<string> {
    console.log('tryOnClothes resolver called', input);
    return this.tryOnService.tryOnClothes(
      user.userId,
      input.personUrl,
      input.garmentUrl,
    );
  }

  @Query(() => [TryOn], { name: 'getTryOns' })
  @UseGuards(GqlAuthGuard)
  async getTryOns(@CurrentUser() user: { userId: number }): Promise<TryOn[]> {
    return this.tryOnService.getTryOns(user.userId);
  }
}
