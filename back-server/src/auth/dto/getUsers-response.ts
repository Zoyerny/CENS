import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
export class GetUsersResponse {
    @Field(() => [User]) // Définir le tableau de User comme nullable
    users: User[]; // Utiliser l'union avec null pour permettre un tableau null ou non-null
}
