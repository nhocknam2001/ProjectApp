import { createLogger, format, transports, Logger } from 'winston';
import { config } from './config';
require('winston-mongodb');

const { WINSTON_MONGODB_URL, WINSTON_MONGODB_COLLECTION, WINSTON_EXPIRE_DAY } = config;

const logger: Logger = createLogger({
  transports: [
    //@ts-ignore
    new transports.MongoDB({
      db: WINSTON_MONGODB_URL,
      options: {
        useUnifiedTopology: true,
      },
      collection: WINSTON_MONGODB_COLLECTION,
      expireAfterSeconds: WINSTON_EXPIRE_DAY * 24 * 60 * 60,
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
    }),
  );
}

export default logger;
