import React from 'react';
import styles from './Calendly.module.scss';
import { useUser } from '@/state/auth';
import useApiHook from '@/state/useApi';
import Loader from '@/components/loader/Loader.component';

const Calendly = () => {
  const onAuthenticate = () => {
    window.open(
      `https://auth.calendly.com/oauth/authorize?client_id=${process.env.CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALENDLY_REDIRECT_URI}&state=calendly`,
      '_blank'
    );
  };

  const { data: loggedInData } = useUser();
  const { data: data, isLoading: loading } = useApiHook({
    method: 'GET',
    key: 'calendly-data',
    url: '/owner/oauth/client/calendly',
  }) as any;

  const { mutate: removeAuth } = useApiHook({
    method: 'PUT',
    key: 'calendly-remove-auth',
    queriesToInvalidate: ['user', 'calendly-data'],
  }) as any;

  return (
    <div className={styles.container}>
      <img
        src={`https://assets.calendly.com/assets/frontend/media/calendly-wordmark-0da6c58d9a06b08c975f.svg`}
        alt="Calendly Logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>Calendly Integration</h3>
      {loading ? (
        <Loader />
      ) : data?.authenticated ? (
        <button
          className={`${styles.button} ${styles.danger}`}
          onClick={() => {
            // remove the authentication
            // this will remove the token from the database, and the user will have to re-authenticate
            removeAuth({
              url: `/merchant/${loggedInData?.user?._id}`,
              formData: { integrations: { calendly: undefined } },
            });
          }}
        >
          Remove Authentication
        </button>
      ) : (
        <button className={styles.button} onClick={onAuthenticate}>
          Authenticate
        </button>
      )}
    </div>
  );
};

export default Calendly;
