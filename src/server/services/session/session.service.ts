import { getManager } from 'typeorm';
import { SessionInterface } from '@shopify/shopify-api';
import { SessionsEntity } from './session.entity';

export const SessionService = {
  async saveSession(session: SessionInterface): Promise<boolean> {
    try {
      await getManager()
        .getMongoRepository(SessionsEntity)
        .updateOne({ id: session.id }, { $set: session }, { upsert: true });
      return true;
    } catch (error) {
      return false;
    }
  },

  async loadSession(id: string): Promise<SessionInterface | undefined> {
    try {
      const data = await getManager().getMongoRepository(SessionsEntity).findOne({ id });

      return data
        ? {
            ...data,
            isActive: () => data.isActive,
          }
        : undefined;
    } catch (error) {}
  },

  async deleteSession(id: string): Promise<boolean> {
    try {
      await getManager().getMongoRepository(SessionsEntity).deleteOne({ id });
      return true;
    } catch (error) {
      return false;
    }
  },

  async getShops() {
    try {
      return getManager()
        .getMongoRepository(SessionsEntity)
        .find({ select: ['shop'] });
    } catch (error) {
      return false;
    }
  },
};
