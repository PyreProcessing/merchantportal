import React, { useEffect, useState } from 'react';

import styles from './Inventory.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useFetchData from '@/state/useFetchData';
import { useUser } from '@/state/auth';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Button, Table, Tag } from 'antd';

type Props = {};

const InventoryView = (props: Props) => {
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data, isFetching, isLoading, error, isError } = useFetchData({
    url: `/inventory`,
    key: 'inventory',
  });

  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Filter inventory"
        queryKey="inventory"
        buttons={[
          {
            icon: <FaPlus />,
            toolTip: 'Add new product',
            type: 'link',
            onClick: () => {
              router.push('/organization/inventory/add');
            },
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
        key={'agents'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        <Table
          dataSource={data?.payload?.merchandise}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record._id}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'SKU',
              dataIndex: 'SKU',
              key: 'sku',
            },
            {
              title: 'Unlimited Stock',
              dataIndex: 'unlimitedStock',
              key: 'unlimitedStock',
              render: (text, record) => <>{record?.unlimitedStock ? 'Yes' : 'No'}</>,
            },
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
              render: (text, record) => (
                // category is an array of strings, so render only the first three categories
                <>
                  {record?.category.slice(0, 3).map((item) => {
                    return (
                      <Tag key={item} color="blue">
                        {item}
                      </Tag>
                    );
                  })}
                </>
              ),
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              render: (text, record) => <>${record?.price}</>,
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text, record) => (
                <Button
                  onClick={() => {
                    router.push(`/organization/inventory/${record._id}`);
                  }}
                >
                  View
                </Button>
              ),
            },
          ]}
        />
      </SearchWrapper>
    </div>
  );
};

export default InventoryView;
