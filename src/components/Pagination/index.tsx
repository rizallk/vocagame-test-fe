import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Button from '../Button';

export type PaginationProps = {
  label?: string;
  variant?: 'variant-1' | 'variant-2';
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (newPage: number) => void;
  siblingCount?: number;
  isLoading?: boolean;
};

// Helper function for generating pagination items based on the current page, total pages, and sibling count
const generatePaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
) => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Kondisi 1: Tidak ada titik di kiri, tapi ada titik di kanan (Halaman awal)
  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Kondisi 2: Ada titik di kiri, tidak ada titik di kanan (Halaman akhir)
  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + 1 + i,
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  // Kondisi 3: Ada titik di kiri dan kanan (Halaman tengah)
  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  return [];
};

export default function Pagination({
  variant = 'variant-1',
  label = '',
  page = 1,
  limit = 10,
  total = 0,
  onPageChange = () => {},
  siblingCount = 1,
  isLoading = false,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(startItem + limit - 1, total);

  const paginationItems = generatePaginationItems(
    page,
    totalPages,
    siblingCount,
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full text-body-text-muted gap-4">
      <div className="left">
        Showing{' '}
        <span className="text-body-text">
          {total === 0 ? 0 : startItem}-{endItem}
        </span>{' '}
        of <span className="text-body-text">{total}</span> {label}
      </div>
      <div className="right">
        {variant === 'variant-1' ? (
          <div className="flex items-center gap-2">
            <Button
              className="rounded-lg size-10 justify-center disabled:opacity-50"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1 || isLoading}
            >
              <BsChevronLeft />
            </Button>

            <div className="flex items-center gap-1">
              {paginationItems.map((p, index) => {
                // Jika elemennya berupa string '...', render teks biasa
                if (p === '...') {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 text-body-text-muted"
                    >
                      ...
                    </span>
                  );
                }

                // Jika elemennya angka, render tombol
                return (
                  <Button
                    key={index}
                    onClick={() => onPageChange(p as number)}
                    className={`rounded-lg size-10 justify-center border-0! ${
                      p === page
                        ? 'bg-[#C0C1FF]! text-[#1000A9] font-bold'
                        : 'hover:bg-secondary/50'
                    }`}
                    disabled={isLoading}
                  >
                    {p}
                  </Button>
                );
              })}
            </div>

            <Button
              className="rounded-lg size-10 justify-center disabled:opacity-50"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages || isLoading}
            >
              <BsChevronRight />
            </Button>
          </div>
        ) : variant === 'variant-2' ? (
          <div className="flex items-center gap-2">
            <Button
              className="rounded-lg size-10 justify-center disabled:opacity-50"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1 || isLoading}
            >
              <BsChevronLeft />
            </Button>
            <Button
              className="rounded-lg size-10 justify-center disabled:opacity-50"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages || isLoading}
            >
              <BsChevronRight />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
