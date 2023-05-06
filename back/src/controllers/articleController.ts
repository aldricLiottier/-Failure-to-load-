import { CreateArticleDto } from 'db/models/ArticleModel';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ArticleService } from '../services/articleService';
import { ReqUser } from 'authPlugin';
import User  from 'db/models/UserModel';
import { UserService } from '../services/userService';
import { sendPushNotification } from '../lib/notifications';

export class ArticleController {
  private articleService: ArticleService;
  private userService: UserService;

  constructor(server: FastifyInstance) {
    this.userService = new UserService(server);
    this.articleService = new ArticleService();
  }

  public getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return reply.code(200).send(await this.articleService.getAll());
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };

  public notification = async (
    creatorId: number,
    articleId: number
  ) => {
    try {
      const users: User[] = await this.userService.getAll();
      users.forEach(user => {
        if (!user.notification) return;
        if (user.following.filter(id => id === creatorId).length === 0) return;
        console.log(user.notification);
        sendPushNotification(user.notification, articleId);
      })
    } catch (error) {
    }
  };

  public create = async (
    request: FastifyRequest<{ Body: CreateArticleDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      request.body["creatorId"] = user.id;
      const article = await this.articleService.create(request.body);
      this.notification(user.id, article.id);
      return reply
        .code(201)
        .send(article);
    } catch (error) {
      request.log.error(error);
      const brief = error?.errors?.map(error => error.message).join('; ');
      error.message = error.message?.concat(': ', brief || 'unknown');
      return reply.code(500).send(error);
    }
  };

  public getById = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) => {
    try {
      const article = await this.articleService.getById(request.params.id);
      if (!article) {
        return reply.code(404).send('Article not found');
      }
      return reply.code(200).send(article);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };

  public follow = async (
    request: FastifyRequest<{
      Params: { id: number };
    }>,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      const article = await this.articleService.getById(
        request.params.id,
      );
      if (!article) {
        return reply.code(404).send('Article not found');
      }
      let followings = Object.assign([], user.following);
      if (followings)
        followings.push(article.creatorId);
      else
        followings = [article.creatorId];
      await user.update({
        following: followings
      })
      return reply.code(200).send(article);
    } catch (error) {
      request.log.error(error);
      const brief = error?.errors?.map(error => error.message).join('; ');
      error.message = error.message?.concat(': ', brief || 'unknown');
      return reply.code(500).send(error);
    }
  };

  public update = async (
    request: FastifyRequest<{
      Params: { id: number };
      Body: CreateArticleDto;
    }>,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      if (user.id !== (await this.articleService.getById(request.params.id))?.creatorId) return reply.code(400).send('');
      const article = await this.articleService.update(
        request.params.id,
        request.body,
      );
      if (!article) {
        return reply.code(404).send('Article not found');
      }
      return reply.code(200).send(article);
    } catch (error) {
      request.log.error(error);
      const brief = error?.errors?.map(error => error.message).join('; ');
      error.message = error.message?.concat(': ', brief || 'unknown');
      return reply.code(500).send(error);
    }
  };

  public delete = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      if (user.id !== (await this.articleService.getById(request.params.id))?.creatorId) return reply.code(400).send('');
      const article = await this.articleService.delete(request.params.id);
      if (!article) {
        return reply.code(404).send('Article not found');
      }
      return reply.code(200).send(article);
    } catch (error) {
      request.log.error(error);
      const brief = error?.errors?.map(error => error.message).join('; ');
      error.message = error.message?.concat(': ', brief || 'unknown');
      return reply.code(500).send(error);
    }
  };
}
