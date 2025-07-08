import React from 'react';

interface SearchState {
  searchValue: string;
}

class Search extends React.Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = { searchValue: localStorage.getItem('searchTerm') || '' };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    const trimmedValue = this.state.searchValue.trim();
    localStorage.setItem('searchValue', trimmedValue);
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
