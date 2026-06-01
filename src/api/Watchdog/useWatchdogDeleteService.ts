import { useApiDelete } from '@/hooks/utils/useApiDelete';

interface Service {
  name: string;
}

export const useWatchdogDeleteService = () => {
  const { data, deleteData, error } = useApiDelete();

  const watchdogDeleteService = async ({ name }: Service) => {
    return deleteData({
      url: '/v1/watchdog/user/service',
      params: { name },
    });
  };

  // Return the function for the call and the necessary data
  return {
    watchdogDeleteService,
    data,
    error,
  };
};
