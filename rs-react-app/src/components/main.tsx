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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchData = useCallback(
    async (searchValue: string = '', page: number = 1) => {
      setLoading(true);
      setError(null);
      const limit = 10;
      const url = searchValue
        ? `https://swapi.tech/api/people/?name=${searchValue}&page=${page}&limit=${limit}`
        : `https://swapi.tech/api/people?page=${page}&limit=${limit}`;

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
          setTotalPage(data.total_pages || 1);
        } else {
          const items = data.result.map(
            (item: CharacterResult) => item.properties
          );
          setItems(items);
          setTotalPage(data.total_pages || 1);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const valueToSearch =
      searchValue || localStorage.getItem('searchValue') || '';
    fetchData(valueToSearch, currentPage);
  }, [searchValue, fetchData, currentPage]);

  if (throwError) {
    throw new Error('Test error from Main component');
  }

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <main className="main">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <button onClick={() => setThrowError(true)}>Throw Error</button>
      <CardList items={items} />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPage}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Main;
