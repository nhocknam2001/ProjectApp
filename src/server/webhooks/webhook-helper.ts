import { WEBHOOK_PATH } from '@utils/constant';
import { hooks } from './index';
import Shopify from '@shopify/shopify-api';
import { WebhookRegistryEntryExtended } from 'types';
import logger from '@utils/logger';

const registerWebhook = async (
  shop: string,
  accessToken: string,
  hook: WebhookRegistryEntryExtended,
) => {
  try {
    const response = await Shopify.Webhooks.Registry.register({
      shop,
      accessToken,
      path: WEBHOOK_PATH,
      topic: hook.topic,
      webhookHandler: hook.webhookHandler,
    });

    if (!response.success) {
      logger.warn(`Failed to register ${hook.topic} webhook: ${response.result}`);
    } else {
      logger.info(`registered ${hook.topic} webhooks`);
    }
  } catch (e) {}
};

export const registerAllWebhooks = async (shop: string, accessToken: string) => {
  for (const hook of hooks) {
    await registerWebhook(shop, accessToken, hook);
  }
};
