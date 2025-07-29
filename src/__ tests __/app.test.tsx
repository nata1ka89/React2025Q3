import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  test('render main part without crashing', async () => {
    await act(async () => {
      render(<App />);
    });

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('render banner without crashing', async () => {
    await act(async () => {
      render(<App />);
    });

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
