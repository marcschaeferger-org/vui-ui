import { useApiPost } from '@/hooks/utils/useApiPost';

export const useSCCreateMap = () => {
  const { data, postData, fetching, error } = useApiPost();

  const handleScCreateMap = async (values: any) => {
    return postData('/v1/sc-mapping', {
      storageClassMapping: values,
    });
  };

  // Return the function for the call and the necessary data
  return {
    handleScCreateMap,
    responseStatus: data,
    fetching,
    error,
  };
};
