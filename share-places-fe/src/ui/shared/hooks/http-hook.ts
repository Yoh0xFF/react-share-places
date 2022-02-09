import { useCallback, useEffect, useRef, useState } from 'react';

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeHttpRequests = useRef([] as Array<AbortController>);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: any = null,
      headers: any = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (x) => x !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((x) => x.abort());
    };
  }, []);

  const clearError = () => {
    setError('');
  };

  return { isLoading, error, sendRequest, clearError };
}
