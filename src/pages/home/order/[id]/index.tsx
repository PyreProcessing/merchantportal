import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout'; 
import OrderDetails from '@/views/home/order/orderDetails/OrderDetails.view';

const Order = () => {
  return (
    <PageLayout pages={[navigation().home.links.order]} largeSideBar={true}>
      <OrderDetails />
    </PageLayout>
  );
};

export default Order;
