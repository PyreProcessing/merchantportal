import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import TransactionsView from '@/views/home/transactions/Transactions.view';

const Transactions = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.transactions]}>
        <TransactionsView />
      </PageLayout>
    </>
  );
};

export default Transactions;
