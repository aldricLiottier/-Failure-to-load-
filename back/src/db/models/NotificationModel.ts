import * as S from 'sequelize-typescript';
import Keys from './KeysModel';
import User from './UserModel';

export type notificationDto = {
  endpoint: string,
  keys: {
    p256dh: string,
    auth: string,
  }
}

@S.Table
@S.DefaultScope(() => ({
  include: [
    {model: Keys}
  ]
}))
export default class Notification extends S.Model<Notification> {
  @S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.INTEGER)
  id: number;

  @S.ForeignKey(() => User)
  @S.Column(S.DataType.INTEGER)
  userId: number;

  @S.AllowNull(false)
  @S.Column(S.DataType.STRING)
  endpoint: string;

  @S.HasOne(() => Keys, 'notificationId')
  keys: Keys;
}
