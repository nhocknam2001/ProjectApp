module.exports = {
  extends: [
    'plugin:shopify/react',
    'plugin:shopify/polaris',
    'plugin:shopify/jest',
    'plugin:shopify/webpack',
    'next/core-web-vitals',
  ],
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'shopify/jsx-no-hardcoded-content': 'off',
      },
    },
  ],
};
