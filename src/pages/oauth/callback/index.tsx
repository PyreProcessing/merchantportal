import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import DashboardView from '@/views/home/dashboard/Dashboard.view';
import GHLOauth from '@/views/oauth/GHLOauth.view';
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

      <PageLayout
        pages={[navigation().account.links.integrations]}
        largeSideBar={true}
      >
        <GHLOauth />
      </PageLayout>
    </>
  );
};

export default Dashboard;
