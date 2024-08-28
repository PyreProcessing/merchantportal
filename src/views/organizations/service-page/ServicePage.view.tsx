import React from 'react';
import styles from './ServicePage.module.scss';
import { useUser } from '@/state/auth';
import { Watermark } from 'antd';

const ServicePage = () => {
  const { data, isLoading, isError, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const user = data?.user;
  return (
    <Watermark content={'Example Only'} className={styles.container}>
      <iframe
        src={
          process.env.ENV === 'development'
            ? `http://localhost:3005/service/example/${user?.businessInfo?.businessSlug}?disableForm=true`
            : `https://payment.pyreprocessing.com/service/example/${user?.businessInfo?.businessSlug}?disableForm=true`
        }
        loading="lazy"
      ></iframe>
    </Watermark>
  );
};

export default ServicePage;
