import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={onNextPage} disabled={currentPage === totalPage}>
        Next
      </button>
    </div>
  );
};
export default Pagination;
