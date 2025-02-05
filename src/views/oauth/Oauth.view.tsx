import React from 'react';
import useApiHook from '@/state/useApi';
import Loader from '@/components/loader/Loader.component';
import Error from '@/components/error/Error.component';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const GHLOauth = () => {
  const router = useRouter();
  // Get the code from query params
  const code = new URLSearchParams(window.location.search).get('code');
  const state = new URLSearchParams(window.location.search).get('state');
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState(null);
  const requestSent = React.useRef(false); // Track if the request has been sent

  const { mutate: getAccessToken } = useApiHook({
    method: 'POST',
    key: `${state}`,
    enabled: !!code && !!state,
    onSuccessCallback: () => {
      setAuthenticated(true);
      setLoading(false);
    },
    onErrorCallback: (error) => {
      console.log(`is error: ${isError}`);
      console.log(error);
      setError(error);
      setIsError(true);
      setLoading(false);
    },
  }) as any;

  // Send the code to the server only once
  React.useEffect(() => {
    if (code && !requestSent.current) {
      setLoading(true); // Set loading state
      requestSent.current = true; // Mark as sent
      getAccessToken({ url: `/owner/oauth/${state}`, formData: { code } });
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
      <Image src={`/images/logo.png`} alt="Pyre Logo" style={styles.logo} width={500} height={200} />
      <div style={styles.subContainer}>
        {loading ? (
          <div>
            <span>Authenticating...</span>
            <Loader />
          </div>
        ) : isError ? (
          <div style={styles.subContainer}>
            <span>Failed to authenticate</span>
            <Error error={error} />
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
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    // backgroundColor: '#07223d',
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
    // width: '100%',
    // height: 'auto',
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
