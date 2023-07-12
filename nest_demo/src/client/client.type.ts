import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Client')
export class ClientType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;
}
