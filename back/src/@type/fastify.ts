import * as fastify from 'fastify';
import * as http from 'http';

declare module 'fastify' {
  export interface FastifyInstance {
    userAuthenticate: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}
