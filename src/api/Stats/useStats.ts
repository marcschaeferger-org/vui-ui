import { useApiGet } from '@/hooks/utils/useApiGet';

export const useStats = () => {
  const { data, getData, fetching, fetchedTime, error } = useApiGet();

  const getStats = async (forced: boolean = false) => {
    return getData({
      url: '/v1/stats',
      params: `forced=${forced}`,
      target: 'agent',
      cache: true,
      force: forced,
    });
  };

  // Return the function for the call and the necessary data
  return {
    getStats,
    data,
    fetching,
    fetchedTime,
    error,
  };
};
