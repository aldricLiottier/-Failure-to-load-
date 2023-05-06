import Article, { CreateArticleDto } from '../db/models/ArticleModel';
import { ArticleManager } from '../managers/articleManager';

export class ArticleService {
  private ArticleManager: ArticleManager;

  constructor() {
    this.ArticleManager = new ArticleManager();
  }

  public getAll = async (): Promise<Array<Article>> => {
    return this.ArticleManager.getAll();
  };

  public create = async (
    createArticleDto: CreateArticleDto,
  ): Promise<Article> => {
    return this.ArticleManager.create(createArticleDto);
  };

  public getById = async (id: number): Promise<Article | null> => {
    return this.ArticleManager.getById(id);
  };

  public update = async (
    id: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<Article | null> => {
    return this.ArticleManager.update(id, updateArticleDto);
  };

  public delete = async (id: number): Promise<number> => {
    return this.ArticleManager.delete(id);
  };
}
