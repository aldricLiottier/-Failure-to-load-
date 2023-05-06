import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import User from './db/models/UserModel';

const secrets = 'WvamH49iG49J';

export interface ReqUser {
  login: string;
  id: number;
  user: boolean;
  iat: number;
  exp: number;
}

export async function isUser(reqUser?: ReqUser) {
  if (!reqUser || reqUser.id === undefined || reqUser.login === undefined) {
    return false;
  }
  const user = await User.findByPk(reqUser.id);
  if (!user || user.login !== reqUser.login) {
    return false;
  }
  return true;
}

export default fp(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: secrets,
  });

  fastify.decorate(
    'userAuthenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
        const reqUser = request.user as ReqUser;
        if (!(await isUser(reqUser))) throw 'Bad token';
      } catch (err) {
        reply.status(500).send(err);
      }
    },
  );
});
