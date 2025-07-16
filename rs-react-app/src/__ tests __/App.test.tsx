import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

test('render the main page', async () => {
  render(<App />);
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
});
