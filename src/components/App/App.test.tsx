import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';

// I understand, that there is only one unit-test in this application
// But for future tests it's necessary to mock everything (child components, non-native hooks) to make tests independent
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/All right reserved/i);
  expect(linkElement).toBeInTheDocument();
});
