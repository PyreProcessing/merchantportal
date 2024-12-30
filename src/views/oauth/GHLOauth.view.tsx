import React from 'react';
import useApiHook from '@/state/useApi';
import Loader from '@/components/loader/Loader.component';
import Error from '@/components/error/Error.component';
import { useRouter } from 'next/navigation';
import { set } from 'nprogress';

const GHLOauth = () => {
  const router = useRouter();
  // Get the code from query params
  const code = new URLSearchParams(window.location.search).get('code');
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false); 
  const requestSent = React.useRef(false); // Track if the request has been sent

  const {
    mutate: getAccessToken,
    isError,
    error,
  } = useApiHook({
    method: 'POST',
    key: 'ghl',
    enabled: !!code,
    onSuccessCallback: () => {
      setAuthenticated(true);
      setLoading(false);
    },
    onErrorCallback: () => {
      setLoading(false);
    },
  }) as any;

  // Send the code to the server only once
  React.useEffect(() => {
    if (code && !requestSent.current) {
      setLoading(true); // Set loading state
      requestSent.current = true; // Mark as sent
      getAccessToken({ url: '/owner/oauth/ghl', formData: { code } });
    }
  }, [code, getAccessToken]);
 
  React.useEffect(() => {
    if (authenticated) { 
      // timeout 5 seconds before redirecting back to integrations page
      setTimeout(() => {
        router.push('/account/integrations');
      }, 5000);
    }
  }, [authenticated]);

  return (
    <div style={styles.card}>
      <img
        src={`https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://cdn.filesafe.space/location%2FknES3eSWYIsc5YSZ3YLl%2Fimages%2F63413f4d-3691-4d3e-8e9c-31ba9bd55cf9.png?alt=media`}
        alt="Integration Logo"
        style={styles.logo}
      />
      <div style={styles.subContainer}>
        <h3 style={styles.title}>GoHighLevel Integration</h3>
        {loading ? (
          <div>
            <span>Authenticating...</span>
            <Loader />
          </div>
        ) : isError ? (
          <div style={styles.subContainer}>
            <span>Failed to authenticate</span>
            <Error error={error?.message} />
          </div>
        ) : (
          <span>Authenticated successfully, redirecting to homepage... </span>
        )}
      </div>
    </div>
  );
};

export default GHLOauth;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#07223d',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    margin: '20px 0',
  },
  logo: {
    width: '100%',
    height: 'auto',
    maxWidth: '500px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
