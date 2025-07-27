import '@testing-library/jest-dom';
import Detail from '../components/detail';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockItems } from '../setupTests';

describe('Detail Component', () => {
  test('render detail and button', () => {
    render(<Detail item={mockItems[0]} onClose={jest.fn()} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<Detail item={mockItems[0]} onClose={jest.fn()} />);
    const button = screen.getByText('Close');
    expect(() => {
      fireEvent.click(button);
      expect(jest.fn()).toHaveBeenCalledTimes(1);
    });
  });
});
