import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App, { AppInitialProps } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import { Provider, useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import '@shopify/polaris/dist/styles.css';
import getConfig from 'next/config';
import { store } from '../store';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nContext, I18nManager } from '@shopify/react-i18n';
import enTranslations from '@shopify/polaris/locales/en.json';
import jaTranslations from '@shopify/polaris/locales/ja.json';

const { SHOPIFY_API_KEY } = getConfig().publicRuntimeConfig;

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
      const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: 'include',
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host, locale }: AppInitialProps | any = this.props;
    let appLocale = locale || '';
    const translation = appLocale.indexOf('ja') === 0 ? jaTranslations : enTranslations;
    const i18nManager = new I18nManager({ locale: appLocale });
    return (
      <I18nContext.Provider value={i18nManager}>
        <AppProvider i18n={translation}>
          <Provider
            config={{
              apiKey: SHOPIFY_API_KEY,
              host: host,
              forceRedirect: true,
            }}
          >
            <ReduxProvider store={store}>
              <MyProvider Component={Component} {...pageProps} />
            </ReduxProvider>
          </Provider>
        </AppProvider>
      </I18nContext.Provider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }): Promise<AppInitialProps | any> => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
