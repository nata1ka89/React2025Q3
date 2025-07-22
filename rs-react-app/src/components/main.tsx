import React, { useCallback, useEffect, useState } from 'react';
import CardList from './card-list';
import type { DescriptionProps } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import Detail from './detail';

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
  const [selectedItem, setSelectedItem] = useState<DescriptionProps | null>(
    null
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 10;
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
    []
  );

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

  useEffect(() => {
    const valueToSearch =
      searchValue || localStorage.getItem('searchValue') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setCurrentPage(page);
    fetchData(valueToSearch, page);
  }, [searchValue, fetchData, searchParams]);

  if (throwError) {
    throw new Error('Test error from Main component');
  }

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setSearchParams({ page: nextPage.toString() });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setSearchParams({ page: prevPage.toString() });
    }
  };

  const handleSelectItem = async (item: DescriptionProps) => {
    const detailsId = item.url.split('/').pop();
    const details = await fetchDetails(item.url);
    if (details) {
      setSelectedItem(details);
    }
    setSearchParams({ page: currentPage.toString(), details: detailsId || '' });
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSearchParams({ page: currentPage.toString() });
  };

  const paginatedItems = searchValue
    ? items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : items;

  return (
    <main className="main">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <button onClick={() => setThrowError(true)}>Throw Error</button>
      <div className={`master-detail${selectedItem ? '-split' : ''}`}>
        <div className="master">
          <CardList items={paginatedItems} onSelect={handleSelectItem} />
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
        </div>
        {selectedItem && (
          <div className="detail">
            <Detail item={selectedItem} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
