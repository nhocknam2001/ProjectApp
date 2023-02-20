import { Context } from 'koa';
import Shopify from '@shopify/shopify-api';
import { ShopService } from 'services';

// Soft check before user can acess Nextjs content
export function acessCheck(handleRequest: (ctx: Context) => Promise<void>) {
  return async (ctx: Context) => {
    const shop = ctx.query.shop as string;

    // early return so that we don't need to query database to get shop info and session for every request,
    // only check if the "shop" query existing
    if (!shop) {
      await handleRequest(ctx);
      return;
    }

    const shopInfo = await ShopService.getShopInfo(shop);
    const session = await Shopify.Utils.loadOfflineSession(shop);
    const isScopeChanged = session && !Shopify.Context.SCOPES.equals(session.scope);

    // Shop is not qualified, go through OAuth to create a new session
    if (!shopInfo || !session || !shopInfo.isAppInstall || isScopeChanged) {
      ctx.redirect(`/auth?shop=${shop}`);
      return;
    }

    await handleRequest(ctx);
  };
}
