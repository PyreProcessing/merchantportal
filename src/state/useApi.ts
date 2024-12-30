import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useRouter } from 'next/navigation';
import decryptData from '@/utils/decryptData';
import { useSearchStore as store } from '@/state/search/search';
import { useInterfaceStore } from './interface';
import { message } from 'antd';

const fetchData = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  options?: any
) => {
  let response;
  switch (method) {
    case 'GET':
      const {
        defaultKeyword = options?.defaultKeyword || store.getState().search,
        defaultPageNumber = options?.defaultPageNumber ||
          store.getState().pageNumber,
        defaultPageLimit = options?.defaultPageLimit ||
          store.getState().pageLimit,
        defaultFilter = `${options?.defaultFilter ?? ''}${
          store.getState().filter ? `|${store.getState().filter}` : ''
        }`,
        defaultSort = options?.defaultSort || store.getState().sort,
        defaultInclude = options?.defaultInclude || store.getState().include,
      } = options || {};

      response = await axios.get(url, {
        params: {
          keyword: defaultKeyword,
          pageNumber: defaultPageNumber,
          pageLimit: defaultPageLimit,
          filterOptions: defaultFilter,
          sortOptions: defaultSort,
          includeOptions: defaultInclude,
        },
      });

      break;
    case 'POST':
      response = await axios.post(url, data);
      break;
    case 'PUT':
      response = await axios.put(url, data);
      break;
    case 'DELETE':
      response = await axios.delete(url, { data });
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
  if (method === 'GET' && typeof response.data.payload === 'string') {
    response.data.payload = JSON.parse(decryptData(response.data.payload));
  }
  return response.data;
};
// Reusable Hook
const useApiHook = (options: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: string;
  key: string | string[];
  filter?: any;
  keyword?: string;
  sort?: any;
  include?: any;
  queriesToInvalidate?: string[];
  successMessage?: string;
  redirectUrl?: string;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccessCallback?: (data: any) => void;
  onErrorCallback?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  // const { addError } = useInterfaceStore((state) => state);
  const router = useRouter();

  const {
    method,
    url,
    key,
    filter,
    sort,
    include,
    queriesToInvalidate,
    successMessage,
    redirectUrl,
    keyword,
    enabled = true,
    refetchOnWindowFocus = false,
    onSuccessCallback,
    onErrorCallback,
  } = options;

  const queryKey = typeof key === 'string' ? [key] : key;

  const query = useQuery({
    queryKey,
    queryFn: () =>
      fetchData(url!, 'GET', undefined, {
        defaultKeyword: keyword,
        defaultFilter: filter,
        defaultSort: sort,
        defaultInclude: include,
      }),
    enabled: enabled && method === 'GET',
    refetchOnWindowFocus,
    retry: 1,
    meta: {
      errorMessage: 'An error occurred while fetching data',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { url?: string; formData?: any }) =>
      fetchData(url ? url : (data.url as any), method, data.formData),
    onSuccess: (data: any) => {
      if (successMessage) {
        // addError({ message: successMessage, type: 'success' });
        message.success(successMessage);
      }

      queriesToInvalidate?.forEach((query: string) => {
        queryClient.invalidateQueries([query] as any);
      });

      if (redirectUrl) {
        router.push(redirectUrl);
      }

      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error: any) => {
      // addError({ message: error.message, type: 'error' });
      message.error(error.message);
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });

  // Return based on method
  return method === 'GET' ? query : mutation;
};

export default useApiHook;
