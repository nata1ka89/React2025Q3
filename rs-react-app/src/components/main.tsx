import React, { useEffect, useRef, useState } from 'react';
import CardList from './card-list';
import type { DescriptionProps } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import Detail from './detail';
import useFetchData from '../utils/useFetchData';
import Pagination from './pagination';
import useFetchDetails from '../utils/useFetchDetails';

interface MainProps {
  searchValue: string;
}

const Main: React.FC<MainProps> = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<DescriptionProps | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 10;
  const {
    items,
    loading: dataLoading,
    error: dataError,
    totalPage,
    fetchData,
  } = useFetchData(itemsPerPage);
  const {
    loading: detailsLoading,
    error: detailsError,
    fetchDetails,
  } = useFetchDetails();
  const prevSearchValue = useRef<string | null>(null);
  const setSearchParamsRef = useRef(setSearchParams);
  useEffect(() => {
    const valueToSearch =
      searchValue || localStorage.getItem('searchValue') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    if (searchParams.has('details')) {
      return;
    }
    if (searchValue !== prevSearchValue.current) {
      setCurrentPage(1);
      setSearchParamsRef.current({ page: '1' });
      prevSearchValue.current = searchValue;
    } else {
      setCurrentPage(page);
    }
    fetchData(valueToSearch, page);
  }, [searchValue, fetchData, searchParams]);

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

  if (dataLoading || detailsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      {dataError && <div className="error-message">{dataError}</div>}
      {detailsError && <div className="error-message">{detailsError}</div>}
      <div className={`master-detail${selectedItem ? '-split' : ''}`}>
        <div className="master">
          <CardList items={paginatedItems} onSelect={handleSelectItem} />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            isDisabled={!!selectedItem}
          ></Pagination>
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
