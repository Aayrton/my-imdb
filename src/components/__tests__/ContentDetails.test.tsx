import React from 'react';
import { render } from '@testing-library/react';
import ContentDetails from '../ContentDetails';

describe('ContentDetails', () => {
  it('renders the title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    const { getByText } = render(
      <ContentDetails title={title} description={description} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
  });
});
