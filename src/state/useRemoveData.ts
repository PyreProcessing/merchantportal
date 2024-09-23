import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { useRouter } from 'next/router';

/**
 * @description Axio call to create or post data to api
 * @param formData
 * @returns
 * @todo add types
 */
const deleteData = async (url: string, formData: any) => {
  const { data } = await axios.delete(url, formData);
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default (options: {
  queriesToInvalidate?: string[];
  queriesToReset?: string[];
  successMessage?: string;
  redirectUrl?: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    (data: { url: string; formData?: any }) =>
      deleteData(data.url, data.formData),
    {
      onSuccess: (data: any) => {
        message.success(options.successMessage || 'Data Removed successfully');
        console.log(`resetting queries: ${options.queriesToReset}`);
        options.queriesToReset?.forEach((query: string) => {
          queryClient.resetQueries([query]);
        });
        console.log(`invalidating queries: ${options.queriesToInvalidate}`);
        options.queriesToInvalidate?.forEach((query: string) => {
          queryClient.invalidateQueries([query]);
        });
        if (options.redirectUrl) {
          router.push(options.redirectUrl);
        }
      },
      onError: (error: Error) => {
        errorHandler(error);
      },
    }
  );
};
