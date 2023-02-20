import React from 'react';
import { useI18n } from '@shopify/react-i18n';
import en from '@locales/en-US.json';
import ja from '@locales/ja.json';

export default function withI18n(Component) {
  return function (props) {
    const [i18n] = useI18n({
      id: 'Layout',
      fallback: en,
      translations(locale) {
        if (locale.indexOf('ja') >= 0) {
          return ja;
        } else if (locale.indexOf('en') >= 0) {
          return en;
        }
      },
    });
    return <Component i18n={i18n} {...props} />;
  };
}
