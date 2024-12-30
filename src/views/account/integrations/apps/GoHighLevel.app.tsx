import React from 'react';
import styles from './GoHighLevel.module.scss';
import Loader from '@/components/loader/Loader.component';
import useApiHook from '@/state/useApi';
import { useUser } from '@/state/auth';

const GoHighLevel = () => {
  const onAuthenticate = () => {
    const options = {
      redirectUri: process.env.NEXT_PUBLIC_GHL_REDIRECT_URI!,
      request_type: 'code',
      client_id: process.env.NEXT_PUBLIC_GHL_CLIENT_ID!,
      scopes: [
        'payments/orders.readonly',
        // 'payments/orders.write',
        // 'payments/integration.readonly',
        // 'payments/integration.write',
        // 'payments/transactions.readonly',
        // 'payments/subscriptions.readonly',
        // 'payments/custom-provider.readonly',
        // 'payments/custom-provider.write',
        // 'products.readonly',
        // 'products/prices.readonly',
        // 'calendars.readonly',
        // 'calendars/events.readonly',
        // 'calendars/events.write',
      ],
    };
    // to authenticate with GoHighLevel, we need to open a new window with a link to the GoHighLevel authentication page
    // passing in a redirect_uri to redirect back to our application after authentication, to get a token we can exchange for an access token on the backend
    window.open(
      `${process.env.NEXT_PUBLIC_GHL_BASE_URL}/oauth/chooselocation?response_type=${
        options.request_type
      }&client_id=${options.client_id}&redirect_uri=${options.redirectUri}&scope=${options.scopes.join(' ')}`,
      '_blank'
    );
  };

  const { data: loggedInData } = useUser();
  const { data: ghldata, isLoading: ghLoading } = useApiHook({
    method: 'GET',
    key: 'ghl-data',
    url: '/owner/oauth/client/ghl',
  }) as any;

  const { mutate: removeAuth } = useApiHook({
    method: 'PUT',
    key: 'ghl-remove-auth',
    queriesToInvalidate: ['user', 'ghl-data'],
  }) as any;

  return (
    <div className={styles.card}>
      <img
        src={`https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://cdn.filesafe.space/location%2FknES3eSWYIsc5YSZ3YLl%2Fimages%2F63413f4d-3691-4d3e-8e9c-31ba9bd55cf9.png?alt=media`}
        alt="Integration Logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>GoHighLevel Integration</h3>
      {ghLoading ? (
        <Loader />
      ) : ghldata?.authenticated ? (
        <button
          className={`${styles.button} ${styles.danger}`}
          onClick={() => {
            // remove the authentication
            // this will remove the token from the database, and the user will have to re-authenticate
            removeAuth({
              url: `/merchant/${loggedInData?.user?._id}`,
              formData: { integrations: { ghl: undefined } },
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

export default GoHighLevel;
