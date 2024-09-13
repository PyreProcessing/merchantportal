import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Modal, Progress, Table, Tag, Tooltip } from 'antd';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useFetchData from '@/state/useFetchData';
import { IoOpenSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import Recurring from '../../transactionalData/forms/Recurring.form';
import usePostData from '@/state/usePostData';
import currencyFormatter from '@/utils/currencyFormatter';
import moment from 'moment';

const RecurringSubscriptions = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching, isLoading } = useFetchData({
    url: '/recurring',
    key: 'recurrings',
    enabled: !!id,
    filter: `customer;${id}`,
  });

  const { mutate: createRecurring } = usePostData({
    url: '/recurring',
    key: 'recurring',
    queriesToInvalidate: ['recurrings'],
  });
  const onCreateRecurringHandler = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to create this subscription?',
      content: 'This will create a recurring subscription for this customer',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        createRecurring({ ...values, customer: id });
      },
    });
  };

  const addRecurring = () => {
    console.log('Add Recurring');
    Modal.confirm({
      title: 'Add Recurring Subscription',
      content: <Recurring onFinish={() => {}} form={form} />,
      width: '50%',
      okText: 'Create',
      cancelText: 'Cancel',
      onOk: () => {
        form
          .validateFields()
          .then((values) => {
            onCreateRecurringHandler(values);
          })
          .catch((errorInfo) => {
            console.log('Error: ', errorInfo);
          });
      },
    });
  };
  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Filter transactions"
        queryKey="recurrings"
        buttons={[
          {
            icon: <FaPlus />,
            onClick: addRecurring,
            type: 'primary',
            shouldPulse: true,
            toolTip: 'Create Recurring Subscription for this customer',
          },
        ]}
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
        key={'recurrings'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        <Table
          dataSource={data?.payload?.data}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record._id}
          // scroll={{ x: 768 }}
          columns={[
            {
              title: 'description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
              render: (text) => currencyFormatter(text),
            },
            {
              title: 'Charge Until Cancel',
              dataIndex: 'chargeUntilCanceled',
              key: 'chargeUntilCanceled',
              render: (text) => (text ? 'Yes' : 'No'),
              // put it in the middle of the cell
              align: 'center',
            },
            {
              title: 'Number of Payments',
              dataIndex: 'numberOfPayments',
              key: 'numberOfPayments',
              align: 'center',
              render: (text, record) => {
                // check if the chargeUntilCanceled is true, if it is, simply return the amount of transactions in the transactions array
                if (record?.chargeUntilCanceled) {
                  return record.transactions.length;
                } else {
                  // return a pill with the number of transactions vs the number of payments left to be made
                  return (
                    <Tooltip
                      title={`${record.transactions.length} / ${text} payments remaining`}
                      placement="top"
                    >
                      <Progress
                        percent={
                          (record.transactions.length /
                            record.numberOfPayments) *
                          100
                        }
                        showInfo={false}
                      />
                    </Tooltip>
                  );
                }
              },
            },
            {
              title: 'status',
              dataIndex: 'status',
              key: 'status',
              render: (text, record) =>
                ({
                  pending: (
                    <Tag color="warning" key={record._id}>
                      Pending
                    </Tag>
                  ),
                  completed: (
                    <Tag color="success" key={record._id}>
                      Completed
                    </Tag>
                  ),  
                  active: (
                    <Tag color="success" key={record._id}>
                      Active
                    </Tag>
                  ),
                  cancelled: (
                    <Tag color="default" key={record._id}>
                      Cancelled
                    </Tag>
                  ),
                }[record.status as any] ?? (
                  <Tag color="default" key={record._id}>
                    Unknown
                  </Tag>
                )),
            },
            {
              title: 'Next Payment Date',
              dataIndex: 'nextChargeDate',
              key: 'nextChargeDate',
              render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    onClick={() => {
                      // router.push(`/home/order/${record._id}`);
                    }}
                  >
                    <IoOpenSharp />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </SearchWrapper>
    </div>
  );
};

export default RecurringSubscriptions;
