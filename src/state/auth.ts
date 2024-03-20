import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from '@/utils/axios';
import setAuthToken from '@/utils/setAuthToken';
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl';
import errorHandler from '@/utils/errorHandler';
import { message } from 'antd';
//make a react query hook to get the user data from the server
const fetchUserData = async (token?: string) => {
  const { data } = await axios.post('/auth/me', {
    token: token,
  });

  return data;
};

const updateUser = async (data: any) => {
  const { data: userData } = await axios.put('/agent', data);

  return userData;
};

export const useUser = (
  token?: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  if (typeof window !== 'undefined' && !token) {
    token = localStorage.getItem('token') as string;
  }

  const query = useQuery(['user'], () => fetchUserData(token), {
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess,
    enabled: !!token,

    onError: (error: Error) => {
      console.log(error);
      // if we errored destroy the token, in local storage
      localStorage.removeItem('token');
      errorHandler(error);
    },
  });

  //save user and token in local storage
  if (query.data && token) {
    localStorage.setItem('token', token);
    // set the auth token in axios
    setAuthToken(token);
  }

  return query;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation((data: any) => updateUser(data), {
    onSuccess: (data: any) => {
      message.success('User Updated');
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['userDetails']);
    },
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
    },
  });

  return mutate;
};

/**
 * @description - fetch user details, in full
 * @param id - user id
 * @returns
 */
export const fetchUserDetails = async (id: string) => {
  const { data } = await axios.get(`/agent/${id}`);
  return data.payload;
};

export const useUserDetails = (id: string) => {
  const query = useQuery(['userDetails', id], () => fetchUserDetails(id), {
    staleTime: Infinity,
    enabled: !!id,
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
    },
  });

  return query;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href =
    process.env.ENV !== 'development'
      ? `https://auth.pyreprocessing.com?logout=true`
      : `http://localhost:3003?logout=true`;
};
