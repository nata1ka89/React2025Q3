import React from 'react';
import useLocalStorage from '../utils/useLocalStorage';

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    setSearchValue(trimmedValue);
    onSearch(trimmedValue);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
