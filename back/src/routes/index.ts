import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import fp from 'fastify-plugin';

import publicRoutes from './public';
const Route: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get('/', {}, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return reply.code(200).send({ hello: 'test' });
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });
  publicRoutes(server);
};
export default fp(Route);
