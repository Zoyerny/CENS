import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AdminInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  bool: boolean;
}