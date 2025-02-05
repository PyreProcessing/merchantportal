import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import Oauth from '@/views/oauth/Oauth.view';
import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Pyre OAuth Client</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout pages={[navigation().account.links.integrations]} largeSideBar={true}>
        <Oauth />
      </PageLayout>
    </>
  );
};

export default Dashboard;
