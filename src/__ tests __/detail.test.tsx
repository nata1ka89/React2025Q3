import '@testing-library/jest-dom';
import Detail from '../components/detail';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockItems } from '../setupTests';
import { useParams, useNavigate, MemoryRouter } from 'react-router';
import { useSearchParams } from 'react-router-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockUseParams = useParams as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe('Detail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ id: '4' });

    mockUseSearchParams.mockReturnValue([new URLSearchParams({ page: '1' })]);

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
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

  test('renders loading state', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  result: {
                    properties: mockItems[0],
                  },
                }),
            } as Response);
          }, 100);
        })
    );
    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders character details', async () => {
    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );

    const name = await screen.findByText('Darth Vader');
    expect(name).toBeInTheDocument();

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('202')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Failed to fetch details'))
      );

    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );

    const errorMessage = await screen.findByText(
      'Error: Failed to fetch details'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('navigates back when close button is clicked', async () => {
    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );

    await screen.findByText('Darth Vader');

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  /*test('renders "No details found" when item is null', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            result: null, // Возвращаем null для данных персонажа
          }),
      } as Response)
    );

    render(
      <MemoryRouter>
        <Detail />
      </MemoryRouter>
    );

    // Проверяем, что отображается сообщение "No details found"
    const noDetailsMessage = await screen.findAllByText((_, element) => {
      return element?.textContent?.includes('No details found') ?? false;
    });
    expect(noDetailsMessage).toBeInTheDocument();
  });*/
});
