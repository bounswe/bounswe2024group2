import React from 'react';
import { render } from '@testing-library/react';
import PortfolioPage from '../components/portfolio/PortfolioPage';

test('renders Portfolio page correctly', () => {
  const { asFragment } = render(<PortfolioPage title="Snapshot Testing" />);
  
  expect(asFragment()).toMatchSnapshot();
});