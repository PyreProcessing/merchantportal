import React from 'react';
import styles from './TransactionOverview.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useFetchData from '@/state/useFetchData';
import { Button, Table } from 'antd';
import { IoOpenSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useUser } from '@/state/auth';
import TransactionsTable from './components/TransactionsTable.component';

const TransactionOverview = () => {
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data, isFetching, isLoading } = useFetchData({
    url: '/order',
    key: 'transactions',
    enabled: !!loggedInData.user._id,
    filter: `merchant;${loggedInData.user._id},orderType;transaction`,
  });

  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Filter Orders by transaction id, tracking number, or customer name"
        queryKey="orders"
        buttons={[]}
        filters={[
          {
            key: '',
            label: 'All',
          },
        ]}
        sort={[
          {
            key: '',
            label: 'Default',
          },
        ]}
        total={data?.payload?.totalCount}
        key={'transactions'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        <TransactionsTable data={data?.payload.data} isLoading={isLoading} />
      </SearchWrapper>
    </div>
  );
};

export default TransactionOverview;
