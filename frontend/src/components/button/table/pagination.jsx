import React, { useCallback, useMemo } from 'react';
import PrevPageButton from './pagination/prevPageButton';
import PageButton from './pagination/pageButton';
import NextPageButton from './pagination/nextPageButton';

const Pagination = ({
  currentPage,
  setCurrentPage,
  length,
  itemsPerPage,
  numberFiltered,
  visiblePagesCount = 6,
}) => {
  const totalPages = useMemo(() => Math.ceil(length / itemsPerPage), [length, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const onPrevPage = useCallback(() => handlePageChange(Math.max(1, currentPage - 1)), [currentPage, handlePageChange]);

  const onNextPage = useCallback(() => handlePageChange(Math.min(totalPages, currentPage + 1)), [currentPage, totalPages, handlePageChange]);

  const visiblePages = useMemo(() => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
    let endPage = Math.min(totalPages, startPage + visiblePagesCount - 1);

    if (endPage - startPage < visiblePagesCount - 1) {
      startPage = Math.max(1, endPage - visiblePagesCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages, visiblePagesCount]);

  return (
    <div className='flex flex-col items-center md:flex-row md:justify-between mt-3'>
      <div className='flex-1 text-center md:text-start'>
        <p className='text-gray-500 sm:text-lg'>Mostrando {numberFiltered} de {length} elementos después de aplicar los filtros.</p>
      </div>
      <div className="flex flex-1 justify-center md:justify-end space-x-1">
        <PrevPageButton onClick={onPrevPage} disabled={currentPage === 1} />
        <div className="space-x-1">
          {visiblePages.map((page) => (
            <PageButton
              key={page}
              page={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            />
          ))}
        </div>
        <NextPageButton onClick={onNextPage} disabled={currentPage === totalPages} />
      </div>
    </div>
  );
};

export default Pagination;
