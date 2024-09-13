import React from 'react';
import styles from './OrderList.module.scss';
import { Button, Modal, Table, Tag } from 'antd';
import { IoOpenSharp } from 'react-icons/io5';
import { FaPlus, FaTrash } from 'react-icons/fa';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useRemoveData from '@/state/useRemoveData';
import useFetchData from '@/state/useFetchData';
import { useUser } from '@/state/auth';
import { useRouter } from 'next/router';
import OrderType from '@/types/OrderType';
import moment from 'moment';

const OrderList = () => {
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data, isFetching, isLoading, error, isError } = useFetchData({
    url: `/order`,
    key: 'orders',
    filter: `orderType;{"$ne":"transaction"}`,
  });

  const { mutate: deleteInventory } = useRemoveData({
    queriesToInvalidate: ['orders'],
    successMessage: 'Order removed successfully',
  });

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Order?',
      content:
        'This action cannot be undone, this doesnt invalidate any payments or refund any money, it simply removes the order from the system. Are you sure you want to continue?',
      onOk() {
        deleteInventory({ url: `/order/${id}` });
      },
      onCancel() {
        return;
      },
    });
  };
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
        key={'orders'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        <Table
          dataSource={data?.payload?.data as OrderType[]}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record._id}
          columns={[
            {
              title: 'Transaction ID',
              dataIndex: 'transactionId',
              key: 'transactionId',
              render: (text, record) => (
                <div>{record.transactionId ?? 'N/A'}</div>
              ),
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
              render: (text, record) => (
                <div>
                  ${record.orderInformation.total.toFixed(2)}{' '}
                  {record.orderInformation.currency}
                </div>
              ),
            },
            {
              title: 'Status',
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
                  failed: (
                    <Tag color="error" key={record._id}>
                      Failed
                    </Tag>
                  ),
                  processing: (
                    <Tag color="processing" key={record._id}>
                      Processing
                    </Tag>
                  ),
                  success: (
                    <Tag color="success" key={record._id}>
                      Success
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
              title: 'Shipped Date',
              dataIndex: 'shippedDate',
              key: 'shippedDate',
              render: (text, record) => (
                // could be null or undefined,
                // so check for it before formatting the date
                <>
                  {record?.shippedDate
                    ? new Date(record?.shippedDate).toDateString()
                    : 'N/A'}
                </>
              ),
            },
            {
              title: 'Tracking Number',
              dataIndex: 'trackingNumber',
              key: 'trackingNumber',
              render: (text, record) => <>{record?.trackingNumber ?? 'N/A'}</>,
            },
            {
              title: 'Date Created',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: (text, record) => (
                <>{moment(record?.createdAt).format('MM/DD/YYYY')}</>
              ),
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    onClick={() => {
                      router.push(`/home/order/${record._id}`);
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

export default OrderList;
