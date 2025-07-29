import { useState } from 'react';

export default function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  const setValue = (value: string) => {
    try {
      localStorage.setItem(key, value);
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}
