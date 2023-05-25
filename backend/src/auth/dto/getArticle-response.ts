import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "src/articles/article.entity";


@ObjectType()
export class GetArticleResponse {
    @Field(() => Article) // Définir le tableau de User comme nullable
    article: Article; // Utiliser l'union avec null pour permettre un tableau null ou non-null
}
