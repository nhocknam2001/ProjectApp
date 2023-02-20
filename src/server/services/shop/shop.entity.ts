import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

export class Subscription {
  status!: string;
  isSponsored!: boolean;
  subscriptionId!: string;
  admin_graphql_api_id?: string;
  name?: string;
  admin_graphql_api_shop_id?: string;
  created_at?: string;
  updated_at?: string;
}

@Entity()
export class ShopsEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  shopName!: string;

  @Column()
  appSubscription?: Subscription;

  @Column()
  currencyFormat?: string;

  @Column()
  currencyCode?: string;

  @Column()
  timezone?: string;

  @Column()
  isAppInstall?: boolean;
}
