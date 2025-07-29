import { useState, useCallback } from 'react';
import { DescriptionProps } from '../types/types';

const useFetchDetails = () => {
  const [item, setItem] = useState<DescriptionProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://swapi.tech/api/people/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.result && data.result.properties) {
        setItem(data.result.properties);
      } else {
        throw new Error('No details found');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { item, loading, error, fetchDetails };
};

export default useFetchDetails;
