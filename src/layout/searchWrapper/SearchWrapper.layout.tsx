import { useSearchStore } from '@/state/search/search';
import { useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Dropdown,
  Input,
  message,
  Pagination,
  Skeleton,
  Space,
  Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';

import styles from './SearchWrapper.module.scss';

import type { MenuProps } from 'antd';
import { MdSort } from 'react-icons/md';
import Link from 'next/link';
import Title from 'antd/es/skeleton/Title';
import TitleContainer from '@/components/titleContainer/TitleContainer.UI';

const { Search } = Input;

type Props = {
  buttons?: {
    icon: React.ReactNode;
    onClick: () => void;
    type: 'link' | 'text' | 'primary' | 'dashed' | 'default' | undefined;
    toolTip?: string;
    shouldPulse?: boolean;
    href?: string;
  }[];
  filters?: {
    label: string;
    key: string;
  }[];
  placeholder: string;
  queryKey: string;
  children?: React.ReactNode;
  total: number;
  sort?: {
    label: string;
    key: string;
  }[];
  isFetching: any;
  disableButtons?: boolean;
  error?: boolean;
  errorData?: any;
};

const SearchWrapper = (props: Props) => {
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState('');
  const {
    setSearch,
    setPageNumber,
    pageNumber,
    search,
    pageLimit,
    setPageLimit,
    modifyFilter,
    removeFilter,
    filter,
    modifySort,
    removeSort,
    sort,
    numberPages,
    setNumberPages,
    setQueryKey,
    queryKey,
  } = useSearchStore((state: any) => state);

  // const { isFetching } = props.hook();

  useEffect(() => {
    if (props.queryKey === queryKey)
      queryClient.invalidateQueries({
        queryKey: [`${props.queryKey}`],
      });
  }, [search, pageNumber, pageLimit, filter, numberPages, sort]);

  useEffect(() => {
    setQueryKey(props.queryKey);

    return () => {
      setSearch('');
      setPageNumber(1);
      setPageLimit(10);
      removeFilter();
      removeSort();
      setNumberPages(0);
    };
  }, []);

  const filterItems: MenuProps['items'] = props.filters
    ? [
        ...props.filters.map((filter, index) => {
          return {
            key: filter.key,
            label: filter.label,
            onClick: () => {
              modifyFilter(filter.key);
              setPageNumber(1);
            },
          };
        }),
      ]
    : [];

  const sortItems: MenuProps['items'] = props.sort
    ? [
        ...props.sort.map((sort, index) => {
          return {
            key: sort.key,
            label: sort.label,
            onClick: () => {
              modifySort(sort.key);
            },
          };
        }),
      ]
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Search
          placeholder={props.placeholder}
          allowClear
          onSearch={(value) => {
            setSearch(value);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          rootClassName={styles.search}
          size="large"
          enterButton
          bordered={false}
          value={searchText}
          disabled={props.disableButtons}
        />
        <div className={styles.buttonContainer}>
          {props.sort && (
            <Dropdown
              className={styles.button}
              menu={{
                items: sortItems,
                selectable: true,
              }}
              disabled={props.disableButtons}
            >
              <Button type="text">
                <Space>
                  <MdSort className={`${styles.icon}`} />
                  {sort !== '' && <Badge dot status="default" />}
                </Space>
              </Button>
            </Dropdown>
          )}
          {props.filters && (
            <Dropdown
              className={styles.button}
              menu={{ items: filterItems, selectable: true }}
              disabled={props.disableButtons}
            >
              <Button type="text">
                <Space>
                  <AiFillFilter
                    className={`${styles.icon} ${
                      filter.length > 0 && styles.active
                    }`}
                  />
                  {filter !== '' && <Badge dot status="default" />}
                </Space>
              </Button>
            </Dropdown>
          )}

          {props.buttons?.map((button, indx) => (
            <Tooltip
              key={button.type}
              title={button.toolTip}
              placement="bottomRight"
            >
              {button.href ? (
                <Link href={button.href}>
                  <Button
                    type={button.type}
                    shape="round"
                    className={styles.button}
                    onClick={button.onClick}
                  >
                    {button.icon}
                  </Button>
                </Link>
              ) : (
                <Button
                  type={button.type}
                  shape="round"
                  className={styles.button}
                  onClick={button.onClick}
                >
                  {button.icon}
                </Button>
              )}
            </Tooltip>
          ))}
        </div>
      </div>

      <div className={styles.childrenContainer}>
        <p className={styles.searchStats}>
          {props.total} items {search !== '' && <span>for {search}</span>}
        </p>
        {props.error && <TitleContainer title={props.errorData.message} styles={styles.titleContainer}/>}
        {props.isFetching ? <Skeleton active /> : props.children}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          total={props.total}
          onChange={(page, pageSize) => {
            setPageNumber(page);
          }}
          current={pageNumber}
          pageSize={pageLimit}
          showSizeChanger={true}
          onShowSizeChange={(current, size) => {
            setPageLimit(size);
          }}
        />
      </div>
    </div>
  );
};

export default SearchWrapper;
