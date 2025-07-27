import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('App Component', () => {
  test('renders App without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
