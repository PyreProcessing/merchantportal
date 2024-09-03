import React, { useEffect, useState } from 'react';
import styles from './Customers.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { FaPlus } from 'react-icons/fa';
import useFetchData from '@/state/useFetchData';
import { useUser } from '@/state/auth';
import { useRouter } from 'next/router';
import { Table } from 'antd';

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
                <span>
                  <a
                    onClick={() =>
                      router.push(`/organization/customers/${record._id}`)
                    }
                  >
                    View
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={data?.payload?.data}
          loading={isFetching}
        />
      </SearchWrapper>
    </div>
  );
};

export default CustomersView;
