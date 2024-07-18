import { useEffect, useState } from "react";

type QueryFunction<T> = () => Promise<T>;

export const useFetch = <T>(fnQuery: QueryFunction<T>): { result: T | null; isLoading: boolean; error: Error | null } => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fnQuery();
        setResult(data);
      } catch (error:any) {
        setError(error); // Capture and handle errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fnQuery]);

  return { result, isLoading, error };
};
