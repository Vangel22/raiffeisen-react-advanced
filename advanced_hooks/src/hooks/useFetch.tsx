import { useState, useCallback, useEffect } from "react";
import axios, { type AxiosRequestConfig } from "axios";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

export const useFetch = <T = unknown,>(
  url: string,
  options?: AxiosRequestConfig
): UseFetchReturn<T> => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState({
        data: null,
        loading: true,
        error: null,
      });
      const response = await axios(url, options);
      console.log("response", response);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as Error | null,
      });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData: fetchData, refetch: fetchData };
};
