import React from 'react';
import { render } from '@testing-library/react';
import NewsPage from '../components/news/NewsPage';

test('renders Login correctly', () => {
  const { asFragment } = render(<NewsPage title="Snapshot Testing" />);
  
  expect(asFragment()).toMatchSnapshot();
});