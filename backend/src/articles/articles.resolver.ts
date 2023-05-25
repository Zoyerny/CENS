import { Resolver} from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}
}
