import * as S from 'sequelize-typescript';
import User from './UserModel';

export type CreateArticleDto = {
  title: string,
  text: string,
}

@S.Table
@S.DefaultScope(() => ({
  attributes: ['id', 'title', 'text', 'creatorId'],
  include: [
  ]
}))
export default class Article extends S.Model<Article> {
  @S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.INTEGER)
  id: number;

  @S.Column(S.DataType.STRING)
  title: string;
  
  @S.Column(S.DataType.STRING)
  text: string;

  @S.ForeignKey(() => User)
  @S.AllowNull(false)
  @S.Column(S.DataType.INTEGER)
  creatorId: number;

  @S.BelongsTo(() => User)
  creator: User;
}
