import React, { useState } from 'react';

import {
  PaginationContainer,
  PaginationButton,
  PaginationForm,
  PaginationInput,
  PaginationInfo,
} from './styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showPrevNext = true,
  showFirstLast = true,
  className,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState('');

  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPage) {
      const page = parseInt(inputPage, 10);
      if (page >= 1 && page <= totalPages) {
        handlePageChange(page);
      }
    }
    setInputPage('');
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer className={className}>
      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          «
        </PaginationButton>
      )}

      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          ‹
        </PaginationButton>
      )}

      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          $active={page === currentPage}
          onClick={() => handlePageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </PaginationButton>
      ))}

      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          ›
        </PaginationButton>
      )}

      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          »
        </PaginationButton>
      )}

      <PaginationForm onSubmit={handleInputSubmit}>
        <PaginationInput
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          placeholder={`1-${totalPages}`}
          aria-label="Enter page number"
        />
        <PaginationButton type="submit">Go</PaginationButton>
      </PaginationForm>

      <PaginationInfo>
        Page {currentPage} of {totalPages}
      </PaginationInfo>
    </PaginationContainer>
  );
};

