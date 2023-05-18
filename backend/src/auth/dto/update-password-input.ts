import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePasswordInput {

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}