import React from "react";
import { DOTS, usePagination } from "../hook/usePagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  TBLData: any[];
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  TBLData,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });  

  if (paginationRange?.length < 2) {
    return (
      <div className="pagination">
        <div className="records-info">
          {`Showing ${TBLData?.length} of ${totalCount} records`}
        </div>
      </div>
    );
  }

  const onNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
  };

  const onPrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onPageChange(currentPage - 1);
  };

  const onPageChangeFunc = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pageNum: number
  ) => {
    e.preventDefault();
    onPageChange(pageNum);
  };

  const start = currentPage * pageSize - (pageSize - 1);
  const end = Math.min(start + pageSize - 1, totalCount);
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button
          className="previous-page-btn"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="page-numbers">
          {paginationRange &&
            paginationRange.map((pgn, i) => {
              if (pgn === DOTS) {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              }
              return (
                <a
                  href="#"
                  key={i}
                  className={(currentPage === pgn || (currentPage === 0 && pgn === 1)) ? "active-page" : ""}
                  onClick={(e) => onPageChangeFunc(e, pgn as number)}
                >
                  {pgn}
                </a>
              );
            })}
        </div>
        <button
          className="next-page-btn"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
