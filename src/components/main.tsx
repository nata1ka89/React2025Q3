import React, { useEffect } from 'react';
import CardList from './card-list';
import type { DescriptionProps } from '../types/types';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useFetchData from '../utils/useFetchData';
import Pagination from './pagination';
import useLocalStorage from '../utils/useLocalStorage';

interface MainProps {
  searchValue: string;
}

const Main: React.FC<MainProps> = ({ searchValue }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [storedSearchValue] = useLocalStorage('searchValue');
  const itemsPerPage = 10;

  const {
    items,
    loading: dataLoading,
    error: dataError,
    totalPage,
    fetchData,
  } = useFetchData(itemsPerPage);

  useEffect(() => {
    const valueToSearch = searchValue || storedSearchValue;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    fetchData(valueToSearch, currentPage);
  }, [searchValue, fetchData, currentPage, storedSearchValue, searchParams]);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', nextPage.toString());
      setSearchParams(newParams);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', prevPage.toString());
      setSearchParams(newParams);
    }
  };

  const handleSelectItem = async (item: DescriptionProps) => {
    const detailsId = item.url.split('/').pop();
    const currentPage = searchParams.get('page') || '1';
    navigate(`/details/${detailsId}?page=${currentPage}`);
  };

  const paginatedItems = searchValue
    ? items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : items;

  if (dataLoading) {
    return <div>Loading...</div>;
  }
  const isDetailVisible =
    searchParams.get('details') ||
    window.location.pathname.includes('/details/');
  return (
    <main className="main">
      {dataError && <div className="error-message">{dataError}</div>}
      <div
        className={isDetailVisible ? 'master-detail-split' : 'master-detail'}
      >
        <div className="master">
          <CardList items={paginatedItems} onSelect={handleSelectItem} />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          ></Pagination>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
