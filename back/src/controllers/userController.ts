import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserService, LoginStatus } from '../services/userService';
import User, { LoginUserDto, RegisterUserDto } from '../db/models/UserModel';
import { ReqUser } from 'authPlugin';
import Notification, { notificationDto } from '../db/models/NotificationModel';
import Keys from '../db/models/KeysModel';

export class UserController {
  private userService: UserService;

  constructor(server: FastifyInstance) {
    this.userService = new UserService(server);
  }

  public login = async (
    request: FastifyRequest<{ Body: LoginUserDto }>,
    reply: FastifyReply,
  ) => {
    try {
      if (
        request.body.login === undefined ||
        request.body.password === undefined
      ) {
        return reply.code(400).send('Login ou mot de passe manquant');
      }
      const res = await this.userService.login(request.body);
      if (res === LoginStatus.ERRPASSWORD || res === LoginStatus.ERRLOGIN) {
        return reply.code(401).send('Login ou mot de passe erroné');
      }
      return reply.status(200).send(res);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };

  public register = async (
    request: FastifyRequest<{ Body: RegisterUserDto }>,
    reply: FastifyReply,
  ) => {
    try {
      return reply
        .code(201)
        .send(await this.userService.register(request.body));
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };

  public getUser = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      return reply
        .code(200)
        .send(user);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };

  public notification = async (
    request: FastifyRequest<{ Body: {notification: notificationDto }}>,
    reply: FastifyReply,
  ) => {
    try {
      const user: User | null = await this.userService.getUser(request.user as ReqUser);
      if (!user) return reply.code(400).send('');
      const data = {
        endpoint: request.body.notification.endpoint,
        userId: user.id
      }
      const notif = await Notification.create(data);
      let data2 = {
        p256dh: request.body.notification.keys.p256dh,
        auth: request.body.notification.keys.auth,
        notificationId: notif.id
      }
      await Keys.create(data2)
      return reply
        .code(200)
        .send("");
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send(error);
    }
  };
}
