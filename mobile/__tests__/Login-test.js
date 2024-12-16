import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/pages/Login';
import { AuthProvider } from '../src/pages/context/AuthContext';

test('renders correctly', () => {
  const tree = renderer.create(
    <AuthProvider>
      <Login />
    </AuthProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
