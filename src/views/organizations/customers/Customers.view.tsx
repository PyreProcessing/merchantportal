import React, { useEffect, useState } from 'react';
import styles from './Customers.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import useFetchData from '@/state/useFetchData';
import { useUser } from '@/state/auth';
import { useRouter } from 'next/router';
import { Button, Modal, Table } from 'antd';
import useRemoveData from '@/state/useRemoveData';

type Props = {};

const CustomersView = (props: Props) => {
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data, isFetching, error, isError } = useFetchData({
    url: `/customer`,
    key: 'customers',
    enabled: !!loggedInData.user,
    filter: `merchant;${loggedInData.user?._id}`,
  });

  const { mutate: deleteCustomer } = useRemoveData({
    queriesToInvalidate: ['customers'],
    successMessage: 'Customer removed successfully',
  });
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this customer?',
      content:
        'This will remove them from the system completely, all payment data and or recurring transactions will be deleted...',
      onOk() {
        deleteCustomer({ url: `/customer/${id}` });
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Filter Customers"
        queryKey="customers"
        error={isError}
        errorData={error}
        buttons={[
          {
            icon: <FaPlus />,
            toolTip: 'Add new customer',
            type: 'link',
            href: '/organization/customers/add',
            onClick: () => {},
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
        key={'customers'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        <Table
          columns={[
            {
              title: 'First Name',
              dataIndex: 'firstName',
              key: 'firstName',
            },
            {
              title: 'Last Name',
              dataIndex: 'lastName',
              key: 'lastName',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Phone Number',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    onClick={() =>
                      router.push(`/organization/customers/${record._id}`)
                    }
                  >
                    <FaEdit />
                  </Button>
                  <Button onClick={() => handleDelete(record._id)}>
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </div>
              ),
            },
          ]}
          pagination={false}
          dataSource={data?.payload?.data}
          loading={isFetching}
        />
      </SearchWrapper>
    </div>
  );
};

export default CustomersView;
