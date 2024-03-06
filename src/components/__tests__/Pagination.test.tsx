import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

const mockRouterReplace = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),

  useRouter: () => ({
    replace: mockRouterReplace,
  }),
  useSearchParams: jest.fn(() => new URLSearchParams('')),
  usePathname: jest.fn(() => '/'),
}));

describe('Pagination', () => {
  it('renders the pagination correctly', () => {
    const { getByText } = render(<Pagination page={1} totalPages={5} />);

    expect(getByText('<<')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
    expect(getByText('Page 1 sur 5')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
    expect(getByText('>>')).toBeInTheDocument();
  });

  it('disables the first page and previous button when on the first page', () => {
    const { getByText } = render(<Pagination page={1} totalPages={5} />);

    const firstPageButton = getByText('<<');
    const previousButton = getByText('<');

    expect(firstPageButton).toBeDisabled();
    expect(previousButton).toBeDisabled();
  });

  it('disables the last page and next button when on the last page', () => {
    const { getByText } = render(<Pagination page={5} totalPages={5} />);

    const lastPageButton = getByText('>>');
    const nextButton = getByText('>');

    expect(lastPageButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('calls router.replace with the correct URL when a pagination button is clicked', () => {
    const { getByText } = render(<Pagination page={3} totalPages={5} />);

    const firstPageButton = getByText('<<');
    const previousButton = getByText('<');
    const nextButton = getByText('>');
    const lastPageButton = getByText('>>');

    fireEvent.click(firstPageButton);
    fireEvent.click(previousButton);
    fireEvent.click(nextButton);
    fireEvent.click(lastPageButton);

    expect(mockRouterReplace).toHaveBeenCalledTimes(4);
    expect(mockRouterReplace).toHaveBeenNthCalledWith(1, '/?page=1');
    expect(mockRouterReplace).toHaveBeenNthCalledWith(2, '/?page=2');
    expect(mockRouterReplace).toHaveBeenNthCalledWith(3, '/?page=4');
    expect(mockRouterReplace).toHaveBeenNthCalledWith(4, '/?page=5');
  });
});
