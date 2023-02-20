import { getManager } from 'typeorm';
import { ShopsEntity } from './shop.entity';

export const ShopService = {
  async getShopInfo(shopName: string) {
    try {
      return getManager().getMongoRepository(ShopsEntity).findOne({ shopName });
    } catch (error) {
      return false;
    }
  },

  async saveShopInfo(data: Omit<ShopsEntity, '_id'>) {
    try {
      return getManager()
        .getMongoRepository(ShopsEntity)
        .updateOne({ shopName: data.shopName }, { $set: data }, { upsert: true });
    } catch (error) {
      return false;
    }
  },

  async handleUninstallShop(shopName: string) {
    try {
      await getManager()
        .getMongoRepository(ShopsEntity)
        .updateOne({ shopName }, { $set: { isAppInstall: false } });
    } catch (error) {
      return false;
    }
  },
};
