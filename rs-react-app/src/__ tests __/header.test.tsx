import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/header';

describe('Header Component', () => {
  test('renders search input and button', () => {
    render(<Header onSearch={jest.fn()} />);
    const title = screen.getByText('Characters within the Star Wars universe');
    expect(title).toBeInTheDocument();
  });
});
