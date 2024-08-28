import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ApiKeys from '@/views/account/apikeys/ApiKeys.view';
const Component = () => {
  return (
    <PageLayout pages={[navigation()?.account?.links?.keys]}>
      <ApiKeys />
    </PageLayout>
  );
};

export default Component;
