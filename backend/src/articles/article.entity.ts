import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
export class Article {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => [String])
  tag: string[];

  @Field()
  like: number

  @Field()
  dislike: number;

  @Field()
  validate: boolean;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
