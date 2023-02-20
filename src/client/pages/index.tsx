import { Page, Button } from '@shopify/polaris';
import withI18n from '@components/withI18n';
import { I18n } from '@shopify/react-i18n';

type IndexPropsType = {
  i18n: I18n;
};
const Index = ({ i18n }: IndexPropsType) => {
  const t = (text: string) => i18n.translate(text);

  return (
    <Page>
      <Button>{t('Index.click-me')}</Button> Welcome to the app 🚀
    </Page>
  );
};

export default withI18n(Index);
