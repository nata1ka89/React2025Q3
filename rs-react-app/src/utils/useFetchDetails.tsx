import { useState } from 'react';

const useFetchDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.result && data.result.properties) {
        return data.result.properties;
      } else {
        throw new Error('No details found');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchDetails };
};
export default useFetchDetails;
