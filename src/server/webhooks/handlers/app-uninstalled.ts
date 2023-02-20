import { WebhookHandlerFunction } from 'types';
import Shopify from '@shopify/shopify-api';
import { ShopService } from 'services';
import logger from '@utils/logger';

export const onAppUninstalled: WebhookHandlerFunction = async (_, shop: string) => {
  try {
    await Shopify.Utils.deleteOfflineSession(shop);
    await ShopService.handleUninstallShop(shop);
    logger.info(`${shop} uninstalled`);
  } catch (e) {
    logger.error(`error on handle uninstall ${shop}`);
  }
};
