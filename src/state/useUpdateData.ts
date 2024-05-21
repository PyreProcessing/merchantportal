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
const updateFormData = async (url: string, formData: any) => {
  console.log(formData);
  const { data } = await axios.put(url, formData);
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default (options: {
  queriesToInvalidate?: string[];
  successMessage?: string;
  redirectUrl?: string;
  onSuccessCallback?: (data: any) => void;
  onErrorCallback?: (error: Error) => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((data: any) => updateFormData(data.url, data.formData), {
    onSuccess: (data: any) => {
      message.success(options.successMessage || 'Data updated successfully');
      options.queriesToInvalidate?.forEach((query: string) => {
        queryClient.invalidateQueries([query]);
      });
      if (options.redirectUrl) {
        router.push(options.redirectUrl);
      }
      // Call optional onSuccess callback
      if (options.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    },
    onError: (error: Error) => {
      errorHandler(error);
      // Call optional onError callback
      if (options.onErrorCallback) {
        options.onErrorCallback(error);
      }
    },
  });
};
