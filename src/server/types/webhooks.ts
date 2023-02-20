import { WebhookRegistryEntry } from '@shopify/shopify-api';
import { WebhookTopic } from '@webhooks/webhook-topics';

export interface WebHook {
  id: number;
  address: string;
  topic: string;
}

export type WebhookHandlerFunction = (
  topic: string,
  shop_domain: string,
  body: string,
) => Promise<void>;

export interface WebhookRegistryEntryExtended extends WebhookRegistryEntry {
  topic: WebhookTopic;
}
