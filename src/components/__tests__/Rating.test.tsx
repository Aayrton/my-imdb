import React from 'react';
import { render } from '@testing-library/react';
import Rating from '../Rating';

describe('Rating', () => {
  it('renders the rating correctly with vote count', () => {
    const { getByText } = render(
      <Rating voteAverage={7.5} voteCount={100} displayCount={true} />
    );

    expect(getByText('7.5')).toBeInTheDocument();
    expect(getByText('(100)')).toBeInTheDocument();
  });

  it('renders the rating correctly without vote count', () => {
    const { getByText, queryByText } = render(
      <Rating voteAverage={7.5} voteCount={100} displayCount={false} />
    );

    expect(getByText('7.5')).toBeInTheDocument();
    expect(queryByText('(100)')).toBeNull();
  });
});
