import * as S from 'sequelize-typescript';
import Article from './ArticleModel';
import Notification from './NotificationModel';

export type LoginUserDto = {
  login: string,
  password: string,
}

export type RegisterUserDto = {
  login: string,
  password: string,
}

@S.Table
@S.DefaultScope(() => ({
  attributes: ['id', 'login', 'password', 'following'],
  include: [
    { model: Notification}
  ]
}))
export default class User extends S.Model<User> {
  @S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.INTEGER)
  id: number;

  @S.AllowNull(false)
  // @S.Unique(true)
  @S.Column(S.DataType.STRING)
  login: string;

  @S.AllowNull(false)
  @S.Column(S.DataType.STRING)
  password: string;

  @S.HasOne(() => Notification, 'userId')
  notification: Notification;

  @S.Column(S.DataType.ARRAY(S.DataType.INTEGER))
  following: number[];

  @S.HasMany(() => Article)
  articles: Article[];
}
