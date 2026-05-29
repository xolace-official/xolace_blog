type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <section className="">
      <div className="flex items-center justify-between border-t border-border/30 pt-6">
        {/* Previous */}
        <button
          type="button"
          disabled={isFirstPage}
          className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>

        {/* Page indicator */}
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          type="button"
          disabled={isLastPage}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
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
