import '@testing-library/jest-dom';
import Card from '../components/card';
import { render, screen } from '@testing-library/react';
import { mockItems } from '../setupTests';

describe('Card Component', () => {
  test('renders correct number of cards', () => {
    render(<Card {...mockItems[0]} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
