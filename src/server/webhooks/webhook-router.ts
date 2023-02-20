import Router from 'koa-router';
import Shopify from '@shopify/shopify-api';
import { WEBHOOK_PATH } from '@utils/constant';
import logger from '@utils/logger';

const router = new Router();

// Handle all webhook events
router.post(WEBHOOK_PATH, async (ctx) => {
  try {
    ctx.response.status = 200;
    await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
    logger.info(`Webhook processed, returned status code 200`);
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`Failed to process webhook: ${error}`);
  }
});

export default router;
