import { FastifyInstance } from 'fastify';
import { UserRoutes } from './userRoutes';
import { ArticleRoutes } from './ArticleRoutes';

export default function routes(server: FastifyInstance) {
  UserRoutes(server);
  ArticleRoutes(server);
}
