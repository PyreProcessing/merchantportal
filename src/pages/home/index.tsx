import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import DashboardView from '@/views/home/dashboard/Dashboard.view';
import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Truthcasting Studio</title>
        <meta name="description" content="Truthcasting Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout pages={[navigation().home.links.home]} largeSideBar={true}>
        <DashboardView />
      </PageLayout>
    </>
  );
};

export default Dashboard;
