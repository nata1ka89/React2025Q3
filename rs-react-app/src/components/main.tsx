import React, { useCallback, useEffect, useState } from 'react';
import CardList from './card-list';
import type { CharacterResult, DescriptionProps } from '../types/types';

interface MainProps {
  searchValue: string;
}

const Main: React.FC<MainProps> = ({ searchValue }) => {
  const [items, setItems] = useState<DescriptionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [throwError, setThrowError] = useState(false);

  const fetchData = useCallback(async (searchValue: string = '') => {
    setLoading(true);
    setError(null);
    const url = searchValue
      ? `https://swapi.tech/api/people/?name=${searchValue}`
      : `https://swapi.tech/api/people`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.results && !data.result) {
        throw new Error('No data found');
      }
      if (data.results) {
        setItems(data.results);
      } else {
        const items = data.result.map(
          (item: CharacterResult) => item.properties
        );
        setItems(items);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const valueToSearch =
      searchValue || localStorage.getItem('searchValue') || '';
    fetchData(valueToSearch);
  }, [searchValue, fetchData]);

  if (throwError) {
    throw new Error('Test error from Main component');
  }
  return (
    <main className="main">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <button onClick={() => setThrowError(true)}>Throw Error</button>
      <CardList items={items} />
    </main>
  );
};

export default Main;
