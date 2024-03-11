import React, { useEffect, useState } from 'react';

import styles from './Transactions.module.scss';
import { useTransactions } from '@/state/transactions/useTransactions';
import Error from '@/components/error/Error.component';
import Loader from '@/components/loader/Loader.component';
import Container from '@/layout/container/Container.layout';
import Transaction from './components/Transaction.component';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Button } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

type Props = {};

const TransactionsView = (props: Props) => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf('year'),
    endDate: moment().endOf('year'),
  });

  const {
    data: transactionsData,
    isLoading,
    isError,
    error,
  } = useTransactions({
    startDate: dateRange.startDate.toDate(),
    endDate: dateRange.endDate.toDate(),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      'transactions',
      dateRange.startDate.toDate(),
      dateRange.endDate.toDate(),
    ]);
  }, [dateRange]);

  return (
    <div className={styles.container}>
      <Container title="Year by year transactions">
        <div className={styles.yearPicker}>
          <h1>{dateRange.startDate.year()}</h1>

          <div className={styles.yearButtons}>
            <Button
              onClick={() =>
                setDateRange({
                  startDate: dateRange.startDate.subtract(1, 'year'),
                  endDate: dateRange.endDate.subtract(1, 'year'),
                })
              }
              type="text"
              shape="circle"
              icon={<IoIosArrowBack />}
            />
            <Button
              onClick={() =>
                setDateRange({
                  startDate: dateRange.startDate.add(1, 'year'),
                  endDate: dateRange.endDate.add(1, 'year'),
                })
              }
              type="text"
              shape="circle"
              icon={<IoIosArrowForward />}
            />
          </div>
        </div>
        {isError && <Error error={error} />}
        {isLoading && <Loader title="Fetching Transactions" />}
        {transactionsData &&
          transactionsData?.data?.visa?.map((transaction) => (
            <Transaction transaction={transaction} />
          ))}
      </Container>
    </div>
  );
};

export default TransactionsView;
