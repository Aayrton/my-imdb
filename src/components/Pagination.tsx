'use client';
import React from 'react';
import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginateProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginateProps> = ({ page, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const buttonsBaseClassName =
    'px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50';

  const paginate = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <button
        onClick={() => paginate(1)}
        disabled={isFirstPage}
        className={classNames(buttonsBaseClassName, {
          'hover:bg-yellow-200': !isFirstPage,
        })}
      >
        {'<<'}
      </button>

      <button
        className={classNames(buttonsBaseClassName, 'ml-3', {
          'hover:bg-yellow-200': !isFirstPage,
        })}
        disabled={isFirstPage}
        onClick={() => paginate(page - 1)}
      >
        {'<'}
      </button>
      <span className="px-4 py-2">
        Page {page} sur {totalPages}
      </span>
      <button
        className={classNames(buttonsBaseClassName, {
          'hover:bg-yellow-200': !isLastPage,
        })}
        disabled={isLastPage}
        onClick={() => paginate(page + 1)}
      >
        {'>'}
      </button>
      <button
        onClick={() => paginate(totalPages)}
        className={classNames(buttonsBaseClassName, 'ml-3', {
          'hover:bg-yellow-200': !isLastPage,
        })}
        disabled={isLastPage}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
