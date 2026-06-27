import { useApiGet } from '@/hooks/utils/useApiGet';

export const useNatsClients = () => {
  const { data, getData, fetching, error } = useApiGet();

  const getNatsClients = async () => {
    return getData({
      url: '/v1/nats/clients',
      target: 'core',
    });
  };

  // Return the function for the call and the necessary data
  return {
    getNatsClients,
    data,
    fetching,
    error,
  };
};
