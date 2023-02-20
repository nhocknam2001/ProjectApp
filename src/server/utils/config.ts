import dotenv from 'dotenv';
import { ApiVersion } from '@shopify/shopify-api';

dotenv.config();

const { MONGODB_POOL_MAX, MONGODB_POOL_MIN } = process.env;

export const config = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  isDev: process.env.NODE_ENV !== 'production',
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || '',
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET || '',
  SCOPES: process.env.SCOPES.split(','),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ''),
  API_VERSION: (process.env.API_VERSION || '') as ApiVersion,
  MONGODB_URL: process.env.MONGODB_URL || '',
  MONGODB_NAME: process.env.MONGODB_NAME || 'product-importer',
  MONGODB_POOL_MAX: MONGODB_POOL_MAX ? parseInt(MONGODB_POOL_MAX, 10) : 100,
  MONGODB_POOL_MIN: MONGODB_POOL_MIN ? parseInt(MONGODB_POOL_MIN, 10) : 1,
  SHOPIFY_WEBHOOKS_PREFIX: process.env.SHOPIFY_WEBHOOKS_PREFIX || 'shopify/webhooks',
  WINSTON_MONGODB_URL: process.env.WINSTON_MONGODB_URL,
  WINSTON_MONGODB_COLLECTION: process.env.WINSTON_MONGODB_COLLECTION || 'server_logs',
  WINSTON_EXPIRE_DAY: parseInt(process.env.WINSTON_EXPIRE_DAY) || 90,
  HOST: process.env.HOST,
  DB_TYPE: process.env.DB_TYPE as any,
  DB_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
  APP_TYPE: process.env.APP_TYPE,
};
