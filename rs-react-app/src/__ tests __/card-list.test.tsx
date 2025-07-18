import '@testing-library/jest-dom';
import CardList from '../components/card-list';
import { render, screen } from '@testing-library/react';

jest.mock('../components/card', () => {
  const MockCard = ({ name }: { name: string }) => (
    <div data-testid="card">{name}</div>
  );
  return MockCard;
});

describe('CardList Component', () => {
  const mockItems = [
    {
      name: 'Darth Vader',
      url: 'https://www.swapi.tech/api/people/4',
      gender: 'male',
      height: '202',
      mass: '136',
      birth_year: '41.9BBY',
      skin_color: 'white',
      hair_color: 'none',
      eye_color: 'yellow',
      homeworld: 'https://www.swapi.tech/api/planets/1',
    },
    {
      name: 'Dexter Jettster',
      url: 'https://www.swapi.tech/api/people/71',
      gender: 'male',
      height: '198',
      mass: '102',
      birth_year: 'unknown',
      skin_color: 'brown',
      hair_color: 'none',
      eye_color: 'yellow',
      homeworld: 'https://www.swapi.tech/api/planets/55',
    },
  ];

  test('renders correct number of cards', () => {
    render(<CardList items={mockItems} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Dexter Jettster')).toBeInTheDocument();
  });
});
