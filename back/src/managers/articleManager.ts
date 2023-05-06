import Article, { CreateArticleDto } from '../db/models/ArticleModel';

export class ArticleManager {
  public getAll = async (): Promise<Array<Article>> => {
    return Article.findAll({ order: [['id', 'DESC']] });
  };

  public create = async (
    createArticleDto: CreateArticleDto,
  ): Promise<Article> => {
    const article: Article = await Article.create(createArticleDto);
    return article;
  };

  public getById = async (id: number): Promise<Article | null> => {
    return Article.findByPk(id);
  };

  public update = async (
    id: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<Article | null> => {
    const article = await Article.findByPk(id);
    return article.update(updateArticleDto);
  };

  public delete = async (id: number): Promise<number> => {
    const article = await this.getById(id);
    if (!article) return 0;
    article.destroy();
    return 1;
  };
}
