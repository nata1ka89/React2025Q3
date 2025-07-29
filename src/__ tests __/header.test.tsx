import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  test('renders search input and button', () => {
    render(
      <MemoryRouter>
        <Header onSearch={jest.fn()} />
      </MemoryRouter>
    );
    const title = screen.getByText('Characters within the Star Wars universe');
    expect(title).toBeInTheDocument();
  });
});
