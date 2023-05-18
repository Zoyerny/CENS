import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateInput {

    @IsNotEmpty()
    @IsString()
    @Field()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Field()
    phone: string;

    @IsNotEmpty()
    @IsBoolean()
    @Field()
    newsLetter: boolean;
}