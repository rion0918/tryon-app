import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TryOnInput {
  @Field()
  personUrl: string;

  @Field()
  garmentUrl: string;
}
