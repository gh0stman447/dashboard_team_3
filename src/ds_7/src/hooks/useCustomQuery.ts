import { useQuery, UseQueryOptions } from 'react-query';

export const useCustomQuery = <T>(key: string | unknown[], queryFn: () => Promise<T>, options?: UseQueryOptions<T>) => {
  return useQuery<T>(key, queryFn, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options
  });
};