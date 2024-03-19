import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import OrderList from '@/views/home/order/OrderList.view';
import Head from 'next/head';

const Order = () => {
  return (
    <>
      <Head>
        <title>Pyre Merchant Portal</title>
        <meta name="description" content="Truthcasting Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout pages={[navigation().home.links.home]} largeSideBar={true}>
        <OrderList />
      </PageLayout>
    </>
  );
};

export default Order;
