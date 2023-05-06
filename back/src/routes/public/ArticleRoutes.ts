import { FastifyInstance } from 'fastify';
import { ArticleController } from '../../controllers/articleController';
import { CreateArticleDto } from 'db/models/ArticleModel';

export const ArticleRoutes = async (server: FastifyInstance) => {
  const articleController = new ArticleController(server);

  server.get(
    '/api/articles',
    async (request, reply) => articleController.getAll(request, reply),
  );
  server.get<{ Params: { id: number } }>(
    '/api/articles/:id',
    async (request, reply) => articleController.getById(request, reply),
  );
  server.get<{ Params: { id: number } }>(
    '/api/articles/:id/follow',
    { onRequest: [server.userAuthenticate] },
    async (request, reply) => articleController.follow(request, reply),
  );
  server.post<{ Body: CreateArticleDto }>(
    '/api/articles',
    { onRequest: [server.userAuthenticate] },
    async (request, reply) => articleController.create(request, reply),
  );
  server.patch<{ Params: { id: number }; Body: CreateArticleDto }>(
    '/api/articles/:id',
    { onRequest: [server.userAuthenticate] },
    async (request, reply) => articleController.update(request, reply),
  );
  server.delete<{ Params: { id: number } }>(
    '/api/articles/:id',
    { onRequest: [server.userAuthenticate] },
    async (request, reply) => articleController.delete(request, reply),
  );
};
