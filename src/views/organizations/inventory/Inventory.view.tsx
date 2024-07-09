import React, { useEffect, useState } from 'react';

import styles from './Inventory.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useFetchData from '@/state/useFetchData';
import { useUser } from '@/state/auth';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Button, Modal, Table, Tag, Tooltip, message } from 'antd';
import { IoOpenSharp } from 'react-icons/io5';
import useRemoveData from '@/state/useRemoveData';
import { encryptData } from '@/utils/encryptData';

type Props = {};

const InventoryView = (props: Props) => {
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data, isFetching, isLoading, error, isError } = useFetchData({
    url: `/inventory`,
    key: 'inventory',
  });

  const { mutate: deleteInventory } = useRemoveData({
    queriesToInvalidate: ['inventory'],
    successMessage: 'Inventory removed successfully',
  });

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this inventory?',
      content: 'This action cannot be undone',
      onOk() {
        deleteInventory({ url: `/inventory/${id}` });
      },
      onCancel() {
        return;
      },
    });
  };
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
              render: (text, record) => (
                <>{record?.unlimitedStock ? 'Yes' : 'No'}</>
              ),
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
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    onClick={() => {
                      router.push(`/organization/inventory/${record._id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Tooltip title="get a shareable link to this product">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://payment.pyreprocessing.com/product/${
                            //URL encode the encrypted data
                            encodeURIComponent(encryptData(record._id))
                          }`
                        );
                        message.success('Copied to clipboard');
                      }}
                    >
                      <IoOpenSharp />
                    </Button>
                  </Tooltip>
                  <Button
                    onClick={() => {
                      handleDelete(record._id);
                    }}
                  >
                    <FaTrash style={{ color: 'red' }} />
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

export default InventoryView;
