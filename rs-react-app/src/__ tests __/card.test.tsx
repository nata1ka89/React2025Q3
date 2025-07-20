import '@testing-library/jest-dom';
import Card from '../components/card';
import { render, screen } from '@testing-library/react';
import { mockItems } from '../setupTests';

describe('Card Component', () => {
  test('renders correct number of cards', () => {
    render(<Card {...mockItems[0]} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(
      screen.getByText('URL: https://www.swapi.tech/api/people/4')
    ).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 202')).toBeInTheDocument();
    expect(screen.getByText('Mass: 136')).toBeInTheDocument();
  });
});
