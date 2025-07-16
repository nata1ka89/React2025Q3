import '@testing-library/jest-dom';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
) as jest.Mock;
