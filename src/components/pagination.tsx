import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPrevPage,
  onNextPage,
  isDisabled,
}) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1 || isDisabled}>
        Prev
      </button>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPage || isDisabled}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
