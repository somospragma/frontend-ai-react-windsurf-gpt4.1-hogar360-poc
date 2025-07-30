import React from 'react';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <nav className='flex justify-center mt-6'>
      <ul className='inline-flex items-center gap-1'>
        <li>
          <button
            className='px-3 py-1 rounded-l bg-gray-100 hover:bg-gray-200 disabled:opacity-50'
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label='Anterior'
          >
            &lt;
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <button
              className={`px-3 py-1 ${p === page ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            className='px-3 py-1 rounded-r bg-gray-100 hover:bg-gray-200 disabled:opacity-50'
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label='Siguiente'
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};
