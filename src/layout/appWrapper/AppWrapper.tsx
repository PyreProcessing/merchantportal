// import LiveOverlay from '@/layout/liveOverlay/LiveOverlay.layout';
import { useUser } from '@/state/auth';
// import { useSelectedProfile } from '@/state/profile/profile';
import { useSocketStore } from '@/state/socket';
// import { useFindLiveVideo } from '@/state/videos/liveVideo';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import io from 'socket.io-client';

type Props = {
  children: React.ReactNode;
};
const AppWrapper = (props: Props) => {
  const queryClient = useQueryClient();
  //Set up state
  // const { data: liveVideoData } = useFindLiveVideo();
  const router = useRouter();
  const token = router.query.token as string;
  const { data: loggedInData, isLoading: userIsLoading } = useUser(token);

  // useSelectedProfile(loggedInData?.user && loggedInData.user?.profile?._id);

  //Set up socket connection
  const { socket, isConnecting, setSocket, setIsConnecting } = useSocketStore(
    (state) => state
  );

  useEffect(() => {
    if (process.env.API_URL) {
      setIsConnecting(true);

      const socket = io(process.env.API_URL.replace('/api/v1', ''));

      socket.on('connect', () => {
        console.log('connected');
        setIsConnecting(false);
        setSocket(socket);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    //If there is a user and a socket connection, setup a setup event with the user data

    if (socket && isConnecting) {
      // Listen for user updates
      socket.emit('setup', loggedInData?.user);
      socket.on('updateUser', () => {
        queryClient.invalidateQueries(['user']);
      });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <>
      {/* <LiveOverlay
        show={
          liveVideoData?.success &&
          /^(prestream|streaming)$/i.test(liveVideoData?.video.status)
        }
      /> */}

      {props.children}
    </>
  );
};

export default AppWrapper;
