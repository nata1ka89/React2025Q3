import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/not-found';

describe('NotFound Component', () => {
  test('renders the 404 page with title and message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const title = screen.getByText('404 - Page Not Found');
    expect(title).toBeInTheDocument();
  });

  test('renders a link to go back to the homepage', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const homePagelLink = screen.getByText('Go back to the homepage');
    expect(homePagelLink).toBeInTheDocument();
    expect(homePagelLink).toHaveAttribute('href', '/');
  });
});
