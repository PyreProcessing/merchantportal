import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import TransactionOverview from '@/views/organizations/transaction/TransactionOverview.view';

const Transactions = () => {
  return (
    <PageLayout pages={[navigation().organization.links.transaction]}>
      <TransactionOverview />
    </PageLayout>
  );
};

export default Transactions;
