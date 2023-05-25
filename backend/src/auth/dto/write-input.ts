import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class WriteInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

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
  tags: string[];

  @IsNotEmpty()
  @IsString()
  @Field()
  image: string;
}
