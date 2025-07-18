import '@testing-library/jest-dom';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
) as jest.Mock;

export const mockItems = [
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
