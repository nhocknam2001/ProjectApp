import { createConnection } from 'typeorm';
import { config } from '@utils/config';
import { ShopsEntity } from '@services/shop/shop.entity';
import { SessionsEntity } from '@services/session/session.entity';
import logger from '@utils/logger';

export const connectDatabase = async (): Promise<boolean> => {
  try {
    await createConnection({
      type: config.DB_TYPE,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE_NAME,
      entities: [ShopsEntity, SessionsEntity],
      url: config.DB_URL,
      useUnifiedTopology: true,
    });

    logger.info('database connected');

    return true;
  } catch (e) {
    logger.error('unable to connect database');
    return false;
  }
};
