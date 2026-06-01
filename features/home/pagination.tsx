'use client';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pages = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
      <section className="">
        <div className="flex items-center justify-between border-t border-border/30 pt-6">

          {/* Previous */}
          <button
              type="button"
              disabled={isFirstPage}
              onClick={() => onPageChange(currentPage - 1)}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
              />
            </svg>
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {pages.map((page, index) =>
                page === '...' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground select-none"
                    >
                                ···
                            </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page as number)}
                        disabled={page === currentPage}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition-colors duration-150
                                    ${page === currentPage
                            ? 'border-foreground bg-foreground text-background font-semibold cursor-default'
                            : 'border-border text-foreground hover:bg-muted'
                        }`}
                    >
                      {page}
                    </button>
                )
            )}
          </div>

          {/* Next */}
          <button
              type="button"
              disabled={isLastPage}
              onClick={() => onPageChange(currentPage + 1)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
              />
            </svg>
          </button>

        </div>
      </section>
  );
}