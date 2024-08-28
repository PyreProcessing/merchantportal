import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useSearchStore as store } from './search/search';

const fetchData = async (options?: {
  url?: string;
  defaultKeyword?: string;
  defaultPageNumber?: number;
  defaultPageLimit?: number;
  defaultFilter?: string;
  defaultSort?: string;
}) => {
  const keyword = options?.defaultKeyword || store.getState().search;
  const pageNumber = options?.defaultPageNumber || store.getState().pageNumber;
  const pageLimit = options?.defaultPageLimit || store.getState().pageLimit; // Fix: Use defaultPageLimit here
  // if there is a default filter, and a store filter, we need to use both, otherwise we can use the values provided
  const filter = `${options?.defaultFilter}${
    store.getState().filter ? `,${store.getState().filter}` : ''
  }`;
  // const filter = options?.defaultFilter || store.getState().filter;
  const sort = options?.defaultSort || store.getState().sort;

  const { data } = await axios.get(
    `${options?.url}?keyword=${keyword}&pageNumber=${pageNumber}&limit=${pageLimit}&filterOptions=${filter}&sortBy=${sort}`
  );
  return data;
};

/**
 * @description - custom hook to retrieve user videos from the api
 * @param keyword - search keyword
 * @param pageNumber - page number, used for pagination
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (options?: {
  key: string | string[];
  url?: string;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  keyword?: string;
  pageNumber?: number;
  pageLimit?: number;
  filter?: string;
  sort?: string;
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const key =
    typeof options?.key === 'string'
      ? [options?.key]
      : // if its an array, remove the array, return both elements as separate strings
        // example ["key1", "key2"] => "key1", "key2"
        options?.key.map((key) => key) || [];
  const query = useQuery(
    key,
    () =>
      fetchData({
        url: options?.url,
        defaultFilter: options?.filter,
        defaultKeyword: options?.keyword,
        defaultPageLimit: options?.pageLimit,
        defaultPageNumber: options?.pageNumber,
        defaultSort: options?.sort,
      }),
    {
      onSuccess: options?.onSuccess,
      // refetchInterval: 2000,
      retry: 1,
      onError: options?.onError,
      enabled: options?.enabled,
      refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
    }
  );
  return query;
};
