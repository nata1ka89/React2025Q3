import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../components/main';
import { mockItems } from '../setupTests';
import { MemoryRouter } from 'react-router-dom';

describe('Main Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (typeof url === 'string' && url.includes('people/4')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              result: {
                properties: mockItems[0],
              },
            }),
        } as Response);
      }

      if (typeof url === 'string' && url.includes('people')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              results: mockItems,
              total_pages: 2,
            }),
        } as Response);
      }

      return Promise.reject(new Error('API Error'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders data from API', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Main searchValue="" />
        </MemoryRouter>
      );
    });

    const items = screen.getAllByText(/Jettster|Vader/);
    expect(items).toHaveLength(2);
  });

  test('renders error message when API call fails', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject(new Error('API Error')));

    await act(async () => {
      render(
        <MemoryRouter>
          <Main searchValue="" />
        </MemoryRouter>
      );
    });

    const errorMessage = screen.getByText('API Error');
    expect(errorMessage).toBeInTheDocument();
  });

  test('shows loading indicator while fetching data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  results: mockItems,
                  total_pages: 2,
                }),
            } as Response);
          }, 100);
        })
    );
    await act(async () => {
      render(
        <MemoryRouter>
          <Main searchValue="" />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('calls handleSelectItem and displays details', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Main searchValue="" />
        </MemoryRouter>
      );
    });

    const item = screen.getByText('Darth Vader');
    fireEvent.click(item);

    const genderElement = await screen.findByTestId('gender');
    expect(genderElement).toHaveTextContent('Gender: male');

    const heightElement = await screen.findByTestId('height');
    expect(heightElement).toHaveTextContent('Height: 202');
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  test('displays error when no details are found', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (typeof url === 'string' && url.includes('people/4')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              result: null,
            }),
        } as Response);
      }

      if (typeof url === 'string' && url.includes('people')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              results: mockItems,
              total_pages: 2,
            }),
        } as Response);
      }

      return Promise.reject(new Error('API Error'));
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Main searchValue="" />
        </MemoryRouter>
      );
    });

    const item = screen.getByText('Darth Vader');
    fireEvent.click(item);

    const errorMessage = await screen.findByText('No details found');
    expect(errorMessage).toBeInTheDocument();
  });
});
