import { useCallback, useState } from 'react';
import { DescriptionProps } from '../types/types';

const useFetchData = (itemsPerPage: number) => {
  const [items, setItems] = useState<DescriptionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState(1);

  const fetchData = useCallback(
    async (searchValue: string = '', page: number = 1) => {
      setLoading(true);
      setError(null);
      const url = searchValue
        ? `https://swapi.tech/api/people/?name=${searchValue}&page=${page}&limit=${itemsPerPage}`
        : `https://swapi.tech/api/people?page=${page}&limit=${itemsPerPage}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        if (!data.results && !data.result) {
          throw new Error('No data found');
        }
        if (!searchValue) {
          setItems(data.results);
          setTotalPage(data.total_pages || 1);
        } else {
          const items = data.result.map(
            (item: { properties: DescriptionProps }) => item.properties
          );
          setItems(items);
          setTotalPage(Math.ceil(data.result.length / itemsPerPage));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  return { items, loading, error, totalPage, fetchData };
};
export default useFetchData;
