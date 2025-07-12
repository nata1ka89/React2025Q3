import React from 'react';

interface SearchProps {
  onSearch: (searchValue: string) => void;
}
interface SearchState {
  searchValue: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchValue: localStorage.getItem('searchValue') || '' };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    const trimmedValue = this.state.searchValue.trim();
    localStorage.setItem('searchValue', trimmedValue);
    this.props.onSearch(trimmedValue);
  };
  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
