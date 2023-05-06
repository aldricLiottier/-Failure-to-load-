import { LoginUserDto, RegisterUserDto } from 'db/models/UserModel';
import { UserController } from '../../controllers/userController';
import { FastifyInstance } from 'fastify';
import { notificationDto } from 'db/models/NotificationModel';

export const UserRoutes = async (server: FastifyInstance) => {
  const userController = new UserController(server);

  server.post<{ Body: LoginUserDto }>(
    '/api/user/login',
    async (request, reply) => userController.login(request, reply),
  );
  server.post<{ Body: RegisterUserDto }>(
    '/api/user/register',
    async (request, reply) => userController.register(request, reply),
  );
  server.get(
    '/api/user',
    {onRequest: [server.userAuthenticate]},
    async (request, reply) => userController.getUser(request, reply),
  )
  server.post<{ Body: {notification: notificationDto } }>(
    '/api/user/notification',
    {onRequest: [server.userAuthenticate]},
    async (request, reply) => userController.notification(request, reply),
  )
};
