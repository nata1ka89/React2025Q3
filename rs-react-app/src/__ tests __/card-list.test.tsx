import '@testing-library/jest-dom';
import CardList from '../components/card-list';
import { render, screen } from '@testing-library/react';
import { mockItems } from '../setupTests';

jest.mock('../components/card', () => {
  const MockCard = ({ name }: { name: string }) => (
    <div data-testid="card">{name}</div>
  );
  return MockCard;
});

describe('CardList Component', () => {
  test('renders correct number of cards', () => {
    const mockOnSelect = jest.fn();
    render(<CardList items={mockItems} onSelect={mockOnSelect} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Dexter Jettster')).toBeInTheDocument();
  });

  test('calls onSelect when a card is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<CardList items={mockItems} onSelect={mockOnSelect} />);

    const cards = screen.getAllByTestId('card');
    cards[0].click();

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockItems[0]);
  });
});
