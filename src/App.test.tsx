import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Let's start!/i);
  expect(linkElement).toBeInTheDocument();
});
