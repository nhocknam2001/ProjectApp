import Shopify from '@shopify/shopify-api';
import Koa, { Context } from 'koa';
import next from 'next';
import Router from 'koa-router';
import webhookRouter from '@webhooks/webhook-router';
import { config } from '@utils/config';
import { SessionService } from 'services';
import { authMiddleware } from '@middlewares/authentication';
import { acessCheck } from '@middlewares/access-check';
import apiRouter from 'api';

import { connectDatabase } from 'db';
import logger from '@utils/logger';

// Init Nextjs App
const app = next({
  dev: config.isDev,
  dir: './src/client',
});

const handle = app.getRequestHandler();

const handleRequest = async (ctx: Context) => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};

// Init Shopify
Shopify.Context.initialize({
  API_KEY: config.SHOPIFY_API_KEY,
  API_SECRET_KEY: config.SHOPIFY_API_SECRET,
  SCOPES: config.SCOPES,
  HOST_NAME: config.HOST_NAME,
  API_VERSION: config.API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    SessionService.saveSession,
    SessionService.loadSession,
    SessionService.deleteSession,
  ),
});

// Start server
app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  if (!(await connectDatabase())) {
    return;
  }

  server.use(apiRouter.routes());
  server.use(apiRouter.allowedMethods());

  router.get('(.*)', acessCheck(handleRequest));

  server.use(authMiddleware());

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.use(webhookRouter.allowedMethods());
  server.use(webhookRouter.routes());

  server.listen(config.PORT, () => {
    logger.info(`> Ready on http://localhost:${config.PORT}`);
  });
});
