import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginatedTemplateProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const PaginatedTemplate: React.FC<PaginatedTemplateProps> = ({
  totalPages,
  currentPage,
  goToPage,
}) => {
  if (totalPages <= 1) return null;

  const pageItems = [];
  const pageNeighbors = 1; // how many neighbors to show around current

  const showPage = (page: number) => {
    pageItems.push(
      <PaginationItem key={page}>
        <PaginationLink
          to={''}
          onClick={() => goToPage(page)}
          isActive={page === currentPage}
          className="cursor-pointer"
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

  // Always show first page
  showPage(1);

  // Show left ellipsis if needed
  if (currentPage - pageNeighbors > 2) {
    pageItems.push(
      <PaginationItem key="left-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  // Show neighbors around current page
  for (
    let page = Math.max(2, currentPage - pageNeighbors);
    page <= Math.min(totalPages - 1, currentPage + pageNeighbors);
    page++
  ) {
    if (page !== 1 && page !== totalPages) {
      showPage(page);
    }
  }

  // Show right ellipsis if needed
  if (currentPage + pageNeighbors < totalPages - 1) {
    pageItems.push(
      <PaginationItem key="right-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  // Always show last page if more than 1
  if (totalPages > 1) {
    showPage(totalPages);
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={''}
            onClick={() => goToPage(currentPage - 1)}
            className={
              currentPage <= 1
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
        {pageItems}
        <PaginationItem>
          <PaginationNext
            to={''}
            onClick={() => goToPage(currentPage + 1)}
            className={
              currentPage >= totalPages
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginatedTemplate;
