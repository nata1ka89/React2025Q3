import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../components/main';
import { mockItems } from '../setupTests';

describe('Main Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: mockItems,
          }),
      } as Response)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders data from API', async () => {
    await act(async () => {
      render(<Main searchValue="" />);
    });

    const items = screen.getAllByText(/Jettster|Vader/);
    expect(items).toHaveLength(2);
  });

  test('renders error message when API call fails', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject(new Error('API Error')));

    await act(async () => {
      render(<Main searchValue="" />);
    });

    const errorMessage = screen.getByText('API Error');
    expect(errorMessage).toBeInTheDocument();
  });

  test('throws error when "Throw Error" button is clicked', () => {
    render(<Main searchValue="" />);

    const button = screen.getByText('Throw Error');
    expect(button).toBeInTheDocument();
  });
});
