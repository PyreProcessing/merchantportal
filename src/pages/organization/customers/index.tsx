import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import CustomersView from '@/views/organizations/customers/Customers.view';
const Customers = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.customer]}>
        <CustomersView />
      </PageLayout>
    </>
  );
};

export default Customers;
