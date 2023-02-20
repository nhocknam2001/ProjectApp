import { Context } from 'koa';
import { registerAllWebhooks } from '@webhooks/webhook-helper';
import { ShopService } from 'services';
import createShopifyAuth from '@shopify/koa-shopify-auth';

async function afterAuth(ctx: Context) {
  const { shop, accessToken } = ctx.state.shopify;
  const host = ctx.query.host;

  await ShopService.saveShopInfo({
    shopName: shop,
    isAppInstall: true,
  });

  await registerAllWebhooks(shop, accessToken);

  // Redirect to app with shop parameter upon auth
  ctx.redirect(`/?shop=${shop}&host=${host}`);
}

export const authMiddleware = () => {
  return createShopifyAuth({
    accessMode: 'offline',
    afterAuth,
  });
};
