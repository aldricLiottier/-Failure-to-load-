import * as S from 'sequelize-typescript';
import Notification from './NotificationModel';

@S.Table
export default class Keys extends S.Model<Keys> {
  @S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.INTEGER)
  id: number;

  @S.ForeignKey(() => Notification)
  @S.Column(S.DataType.INTEGER)
  notificationId: number;

  @S.Column(S.DataType.STRING)
  p256dh: string;

  @S.Column(S.DataType.STRING)
  auth: string;
}
