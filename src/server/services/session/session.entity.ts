import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class SessionsEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  id!: string;

  @Column()
  shop!: string;

  @Column()
  state: string;

  @Column()
  scope!: string;

  @Column()
  expires?: Date;

  @Column()
  isOnline?: boolean;

  @Column()
  isActive: boolean;

  @Column()
  accessToken?: string;
}
