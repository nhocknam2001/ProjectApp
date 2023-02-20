export type WebhookTopic =
  | 'APP_UNINSTALLED'
  | 'APP_SUBSCRIPTIONS_UPDATE'
  | 'APP_PURCHASES_ONE_TIME_UPDATE'
  | 'CARTS_CREATE'
  | 'CARTS_UPDATE'
  | 'CHECKOUTS_CREATE'
  | 'CHECKOUTS_DELETE'
  | 'CHECKOUTS_UPDATE'
  | 'COLLECTION_LISTINGS_ADD'
  | 'COLLECTION_LISTINGS_REMOVE'
  | 'COLLECTION_LISTINGS_UPDATE'
  | 'COLLECTIONS_CREATE'
  | 'COLLECTIONS_DELETE'
  | 'COLLECTIONS_UPDATE'
  | 'CUSTOMER_GROUPS_CREATE'
  | 'CUSTOMER_GROUPS_DELETE'
  | 'CUSTOMER_GROUPS_UPDATE'
  | 'CUSTOMERS_CREATE'
  | 'CUSTOMERS_DELETE'
  | 'CUSTOMERS_DISABLE'
  | 'CUSTOMERS_ENABLE'
  | 'CUSTOMERS_UPDATE'
  | 'DRAFT_ORDERS_CREATE'
  | 'DRAFT_ORDERS_DELETE'
  | 'DRAFT_ORDERS_UPDATE'
  | 'FULFILLMENT_EVENTS_CREATE'
  | 'FULFILLMENT_EVENTS_DELETE'
  | 'FULFILLMENTS_CREATE'
  | 'FULFILLMENTS_UPDATE'
  | 'ORDER_TRANSACTIONS_CREATE'
  | 'ORDERS_CANCELLED'
  | 'ORDERS_CREATE'
  | 'ORDERS_DELETE'
  | 'ORDERS_FULFILLED'
  | 'ORDERS_PAID'
  | 'ORDERS_PARTIALLY_FULFILLED'
  | 'ORDERS_UPDATED'
  | 'PRODUCT_LISTINGS_ADD'
  | 'PRODUCT_LISTINGS_REMOVE'
  | 'PRODUCT_LISTINGS_UPDATE'
  | 'PRODUCTS_CREATE'
  | 'PRODUCTS_DELETE'
  | 'PRODUCTS_UPDATE'
  | 'REFUNDS_CREATE'
  | 'SHOP_UPDATE'
  | 'THEMES_CREATE'
  | 'THEMES_DELETE'
  | 'THEMES_PUBLISH'
  | 'THEMES_UPDATE'
  | 'INVENTORY_LEVELS_CONNECT'
  | 'INVENTORY_LEVELS_UPDATE'
  | 'INVENTORY_LEVELS_DISCONNECT'
  | 'INVENTORY_ITEMS_CREATE'
  | 'INVENTORY_ITEMS_UPDATE'
  | 'INVENTORY_ITEMS_DELETE'
  | 'LOCATIONS_CREATE'
  | 'LOCATIONS_UPDATE'
  | 'LOCATIONS_DELETE';
