import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination';

describe('Pagination Component', () => {
  test('renders Prev and Next buttons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPage={5}
        onPrevPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('disables Prev button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPage={5}
        onPrevPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPage={5}
        onPrevPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPrevPage when Prev button is clicked', () => {
    const mockOnPrevPage = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPage={5}
        onPrevPage={mockOnPrevPage}
        onNextPage={jest.fn()}
      />
    );

    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);

    expect(mockOnPrevPage).toHaveBeenCalledTimes(1);
  });

  test('calls onNextPage when Next button is clicked', () => {
    const mockOnNextPage = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPage={5}
        onPrevPage={jest.fn()}
        onNextPage={mockOnNextPage}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });
});
