import User, { LoginUserDto, RegisterUserDto } from '../db/models/UserModel';
import { UserManager } from '../managers/userManager';
import { FastifyInstance } from 'fastify';
import { encrypt } from '../lib/common';
import { ReqUser } from 'authPlugin';

export enum LoginStatus {
  ERRLOGIN,
  ERRPASSWORD,
}

export class UserService {
  private UserManager: UserManager;
  private Server: FastifyInstance;

  constructor(server) {
    this.UserManager = new UserManager();
    this.Server = server;
  }

  public login = async (body: LoginUserDto): Promise<LoginStatus | string> => {
    const user = await this.UserManager.login(body);
    const encryptedPassword = encrypt(body.password);

    if (!user) {
      return LoginStatus.ERRLOGIN;
    }
    if (user.password === encryptedPassword) {
      return this.Server.jwt.sign(
        {
          login: user.login,
          id: user.id,
        },
        {
          algorithm: 'HS256',
          expiresIn: '24h',
        },
      );
    }
    return LoginStatus.ERRPASSWORD;
  };

  public register = async (
    registerUserDto: RegisterUserDto,
  ): Promise<User> => {
    registerUserDto.password = encrypt(registerUserDto.password);
    return this.UserManager.register(registerUserDto);
  };

  public getUser = async (
    user: ReqUser
  ): Promise<User | null> => {
    return this.UserManager.getUser(user);
  }

  public getAll = async (): Promise<User[]> => {
    return this.UserManager.getAll();
  }
}
