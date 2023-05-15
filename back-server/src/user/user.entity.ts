import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  role: Role;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}