import '@testing-library/jest-dom';
import Card from '../components/card';
import { render, screen } from '@testing-library/react';

describe('Card Component', () => {
  const mockItem = {
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
  };
  test('renders correct number of cards', () => {
    render(<Card {...mockItem} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
