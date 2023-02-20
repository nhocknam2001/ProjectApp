import Shopify from '@shopify/shopify-api';
import { WEBHOOK_PATH } from '@utils/constant';
import { onAppUninstalled } from './handlers/app-uninstalled';
import { WebhookRegistryEntryExtended } from 'types';

export const hooks: WebhookRegistryEntryExtended[] = [
  {
    path: WEBHOOK_PATH,
    topic: 'APP_UNINSTALLED',
    webhookHandler: onAppUninstalled,
  }
];

Shopify.Webhooks.Registry.webhookRegistry = hooks;
