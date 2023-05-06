import { ReqUser } from 'authPlugin';
import User, { LoginUserDto, RegisterUserDto } from '../db/models/UserModel';

export class UserManager {
  public login = async (body: LoginUserDto): Promise<User> => {
    return User.findOne({ where: { login: body.login } });
  };

  public register = async (
    registerUserDto: RegisterUserDto,
  ): Promise<User> => {
    return User.create(registerUserDto);
  };

  public getUser = async (
    user: ReqUser,
  ): Promise<User | null> => {
    return User.findOne({ where: {login: user.login }});
  };

  public getAll = async (
  ): Promise<User[]> => {
    return User.findAll();
  };
}
