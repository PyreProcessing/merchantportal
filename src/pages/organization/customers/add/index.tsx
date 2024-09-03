import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CustomerDetails from '@/views/organizations/customers/customerDetails/CustomerDetails.view';

const Component = () => {
  return (
    <PageLayout pages={[navigation()?.organization?.links?.customer]}>
      <CustomerDetails />
    </PageLayout>
  );
};

export default Component;
