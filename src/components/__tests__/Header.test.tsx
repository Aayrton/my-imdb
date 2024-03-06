import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Header />);

    const logo = screen.getByText('MY IMDB');
    expect(logo).toBeInTheDocument();
  });
});
