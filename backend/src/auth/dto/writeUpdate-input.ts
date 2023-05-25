import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class WriteUpdateInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  articleId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  articleName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field(() => [String])
  tag: string[];

  @IsNotEmpty()
  @IsString()
  @Field()
  image: string;
}
