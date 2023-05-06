import fastify from 'fastify';
import routes from './routes/index';
import multer from 'fastify-multer';
import cookie from '@fastify/cookie';
import authPlugin from './authPlugin';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';

// Load env vars
import loadConfig from './lib/config';

import { db, onStartup } from './db/config';
//import path from 'path';
//import ConnectDB from './db/config';

loadConfig();

export const baseUrl = 'https://gregoriex.fr:5000';
export const siteBaseUrl = 'https://gregoriex.fr';

export async function createServer() {
  await onStartup();
  const server = fastify({
    logger: {
      level: process.env.LOG_LEVEL,
    },
  });

  server.register(authPlugin);
  server.register(cookie);
  server.register(fastifyStatic, {
    root: `${process.cwd()}/uploads`,
  });
  server.register(routes);
  server.register(fastifyCors, {
    origin:
      'https://gregoriex.fr'
  });
  server.register(multer.contentParser);

  await server.ready();
  return server;
}

export async function startServer() {
  const server = await createServer();
  await server.listen({
    host: process.env.API_HOST,
    port: +process.env.API_PORT,
  });

  process.on('SIGINT', async function () {
    console.log('SIGNINT');
    await db.close();
    await server.close();
    process.exit(0);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
