import React from 'react';
import styles from './index.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { useRouter } from 'next/router';
import useFetchData from '@/state/useFetchData';
import { Button, Table, Tag } from 'antd';
import { IoOpenSharp } from 'react-icons/io5';
import currencyFormatter from '@/utils/currencyFormatter';
import TransactionsTable from '@/views/organizations/transaction/components/TransactionsTable.component';

const Transactions = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching, isLoading } = useFetchData({
    url: '/order',
    key: 'transactions',
    enabled: !!id,
    filter: `customerId;${id},orderType;transaction`,
  });
  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Filter transactions"
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

export default Transactions;
