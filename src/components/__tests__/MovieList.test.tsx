//@ts-nocheck
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieList from '../MovieList';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: jest.fn(() => new URLSearchParams('')),
  usePathname: jest.fn(() => '/movies'),
}));

describe('MovieList', () => {
  const mockMovies = [
    {
      poster_path: '/poster1.jpg',
      title: 'Movie 1',
      vote_average: 7.5,
      id: 123,
      vote_count: 100,
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
    },
    {
      poster_path: '/poster2.jpg',
      title: 'Movie 2',
      vote_average: 8.0,
      id: 456,
      vote_count: 200,
      genres: [{ name: 'Drama' }, { name: 'Romance' }],
    },
  ];

  it('renders the movie list correctly', () => {
    const { getByText } = render(<MovieList movies={mockMovies} />);

    expect(getByText('Trier par popularité')).toBeInTheDocument();
    expect(getByText('Trier par ordre alphabétique')).toBeInTheDocument();
    expect(getByText('List')).toBeInTheDocument();
    expect(getByText('Grid')).toBeInTheDocument();
  });

  it('changes the sort order when select option is changed', () => {
    const { getByLabelText } = render(<MovieList movies={mockMovies} />);

    const selectElement = getByLabelText('Sort By');
    fireEvent.change(selectElement, { target: { value: 'title.asc' } });

    expect(mockPush).toHaveBeenCalledWith('/movies?sortBy=title.asc');
  });

  it('switches to list view when List button is clicked', () => {
    const { getByText } = render(<MovieList movies={mockMovies} />);

    const listButton = getByText('List');
    fireEvent.click(listButton);

    expect(getByText('List')).toHaveClass('bg-yellow-200');
    expect(getByText('Grid')).toHaveClass('bg-gray-200');
  });

  it('switches to grid view when Grid button is clicked', () => {
    const { getByText } = render(<MovieList movies={mockMovies} />);

    const gridButton = getByText('Grid');
    fireEvent.click(gridButton);

    expect(getByText('List')).toHaveClass('bg-gray-200');
    expect(getByText('Grid')).toHaveClass('bg-yellow-200');
  });
});
