import React, { ReactNode } from 'react';
import styles from './CustomerOverview.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Modal, Tabs, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import useFetchData from '@/state/useFetchData';
import { FaMoneyBillWave } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import AnimatedDiv from '@/components/animatedDiv/AnimatedDiv.UI';
import CustomerInformation from './customerInformation/CustomerInformation.component';
import Transactions from './transactions/Transactions.component';
import RecurringSubscriptions from './recurringsubs/RecurringSubscriptions.component';
import usePostData from '@/state/usePostData';
import VaultInformation from './vaultInformation/VaultInformation.component';

const CustomerOverview = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = useFetchData({
    url: `/customer/${id}`,
    key: 'customer',
    enabled: !!id,
  });
  const tabs = [
    {
      title: 'Customer Information',
      key: '1',
      content: <CustomerInformation user={data?.payload} />,
    },
    { title: 'Transactions', key: '2', content: <Transactions /> },
    {
      title: 'Recurring Subscriptions',
      key: '3',
      content: <RecurringSubscriptions />,
      hideIf: !data?.payload?.vault,
    },
    {
      title: 'Vaulted Payment Methods',
      key: '4',
      content: <VaultInformation />,
    },
  ] as { title: string; key: string; content: ReactNode; hideIf?: boolean }[];

  const { mutate: postTransaction } = usePostData({
    url: `/transaction/vaulted-transact`,
    key: 'transaction',
  });

  const handleTransaction = () => {
    Modal.confirm({
      title: 'Run Transaction',
      content: (
        <Form>
          <p style={{ marginBottom: '10px' }}>
            This will run a single transaction against the users stored
            credit/ach information, please ensure you have the correct authority
            to charge this customer
          </p>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: 'Please input the amount',
              },
              {
                pattern: /^[0-9]+\.[0-9]{2}$/,
                message:
                  'Amount must be in x.xx format with two decimal places.',
              },
            ]}
          >
            <Input placeholder={`X.XX`} className={formStyles.form__input} />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Description of payment"
            rules={[]}
          >
            <Input
              placeholder={`A short descriptor`}
              className={formStyles.form__input}
            />
          </Form.Item>
        </Form>
      ),
      onOk() {
        // handle transaction
        postTransaction(
          {
            amount: 1.0,
            customerId: id,
          },
          {
            onSuccess: () => {
              Modal.success({
                title: 'Transaction Successful',
                content: 'The transaction was successful',
              });
            },
            onError: (data) => {
              Modal.error({
                title: 'Transaction Failed',
                content: `The transaction failed ${data?.message}`,
              });
            },
          }
        );
      },
    });
  };

  const customer = data?.payload;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftContainer}>
          <h1>Customer Overview</h1>
          <p>You are viewing information for: {customer?.fullName}</p>
        </div>
        <div className={styles.rightContainer}>
          <Tooltip title="Run Transaction for this customer">
            <Button
              className={styles.paymentMethodButton}
              onClick={handleTransaction}
              disabled={!customer?.vault}
            >
              <FaMoneyBillWave className={styles.icon} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className={styles.navContainer}>
        <Tabs defaultActiveKey="1" type="card">
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={tab.key} disabled={tab.hideIf}>
              <AnimatePresence mode="wait">
                <AnimatedDiv
                  transitionType="fade"
                  duration={0.5}
                  key={`switchableView-${tab.key}`}
                  type="whileInView"
                  className={styles.heroContainer}
                >
                  {tab.content}
                </AnimatedDiv>
              </AnimatePresence>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerOverview;
