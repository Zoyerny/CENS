import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "src/articles/article.entity";

@ObjectType()
export class GetArticlesResponse {
    @Field(() => [Article])
    articles: Article[];
}
