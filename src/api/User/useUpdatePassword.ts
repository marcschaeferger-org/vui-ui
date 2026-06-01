import { useApiPut } from '@/hooks/utils/useApiPut';

export const useUpdatePassword = () => {
  const { putData, responseStatus, fetching } = useApiPut();

  const handleUpdatePassword = async (password: string) => {
    return putData('/v1/users/me/update/pwd', { password }, 'static');
  };

  // Return the function for the call and the necessary data
  return {
    handleUpdatePassword,
    responseStatus,
    fetching,
  };
};
