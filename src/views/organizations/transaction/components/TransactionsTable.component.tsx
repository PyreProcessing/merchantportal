import currencyFormatter from '@/utils/currencyFormatter';
import { Button, Table, Tag } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { IoOpenSharp } from 'react-icons/io5';

interface TransactionsTableProps {
  data: any;
  isLoading: boolean;
}

const TransactionsTable = ({ data, isLoading }: TransactionsTableProps) => {
  const router = useRouter();
  return (
    <Table
      dataSource={data}
      loading={isLoading}
      pagination={false}
      rowKey={(record) => record._id}
      columns={[
        {
          title: 'Transaction ID',
          dataIndex: 'transactionId',
          key: 'transactionId',
          render: (text, record) => <div>{record.transactionId ?? 'N/A'}</div>,
        },
        {
          title: "Customer's Name",
          dataIndex: 'customer.name',
          key: 'customersname',
          render: (text, record) => <div>{record.customer.name ?? 'N/A'}</div>,
        },
        {
          title: 'Amount',
          dataIndex: 'orderInformation.total',
          key: 'amount',
          render: (text, record) => (
            <div>
              {currencyFormatter(record.orderInformation.total) ?? 'N/A'}
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
  );
};

export default TransactionsTable;
