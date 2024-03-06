//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from '../MovieCard';

const mockMovie = {
  poster_path: '/poster.jpg',
  title: 'Test Movie',
  vote_average: 7.5,
  id: 123,
  vote_count: 100,
  genres: [{ name: 'Action' }, { name: 'Adventure' }],
};

describe('MovieCard', () => {
  it('renders the movie card correctly', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} inlineDisplay={false} />
    );

    expect(getByText('Test Movie')).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
  });

  it('renders the movie card with inline display correctly', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} inlineDisplay={true} />
    );

    expect(getByText('Test Movie')).toBeInTheDocument();
    expect(getByText('Action, Adventure')).toBeInTheDocument();
  });
});
