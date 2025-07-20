import '@testing-library/jest-dom';
import Search from '../components/search';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  beforeEach(() => localStorage.clear());

  test('renders search input and button', () => {
    render(<Search onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('displays saved search term from localStorage on mount', () => {
    localStorage.setItem('searchValue', 'Luke Skywalker');
    render(<Search onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('Luke Skywalker');
  });

  test('shows empty input when no saved term exists', () => {
    render(<Search onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('');
  });

  test('updates input value when user types', async () => {
    render(<Search onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Darth Vader');
    expect(input).toHaveValue('Darth Vader');
  });

  test('saves search term to localStorage when search button is clicked', async () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');
    await userEvent.type(input, 'C-3PO');
    await userEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('C-3PO');
    expect(mockOnSearch).toHaveBeenCalledWith('C-3PO');
  });
});
