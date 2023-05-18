import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdatePasswordReponse{
    
    @Field()
    changed: boolean;

}