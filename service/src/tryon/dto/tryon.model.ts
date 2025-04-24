import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TryOn {
  @Field(() => Int)
  id: number;

  @Field()
  imageUrl: string;

  @Field()
  createdAt: Date;
}
