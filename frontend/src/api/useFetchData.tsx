import { publicApi } from '@/api/axiosConfig';
import { useEffect, useState } from 'react';

export function useFetchData<TData extends object>({
  endpoint,
  isEnabled = true,
}: {
  endpoint: string;
  isEnabled?: boolean;
}) {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    setIsLoading(true);
    setIsError(false);
    publicApi
      .get<TData>(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          setIsLoading(false);
          setData(response.data);
        },
        (e) => {
          setIsLoading(false);
          setIsError(true);
          console.error('Error occured while loading articles', e);
        },
      );
  }, [isEnabled]);

  return { data, isLoading, isError };
}
