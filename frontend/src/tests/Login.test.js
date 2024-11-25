// MyComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import MarketsPage from '../components/markets/MarketsPage';

test('renders Login correctly', () => {
  const { asFragment } = render(<MarketsPage title="Snapshot Testing" />);
  
  expect(asFragment()).toMatchSnapshot();
});
