import Router from 'koa-router';
import { verifyRequest } from '@shopify/koa-shopify-auth';

const router = new Router({
  prefix: '/api',
});

router.use(
  verifyRequest({
    accessMode: 'offline',
    returnHeader: true,
  }),
);

export default router;
