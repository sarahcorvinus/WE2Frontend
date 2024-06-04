import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Überschrift Trinkprotokolle vorhanden', () => {
  render(<App />);
  const titleElement = screen.getByText(/Trinkprotokolle/i);
  expect(titleElement).toBeInTheDocument();
});
