import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CustomerOverview from '@/views/organizations/customers/customerOverview/CustomerOverview.view';

const Component = () => {
  return (
    <PageLayout pages={[navigation()?.organization?.links?.customer]}>
      <CustomerOverview />
    </PageLayout>
  );
};

export default Component;
