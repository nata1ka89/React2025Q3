import React from 'react';
import Search from './search';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
}
class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header className="header">
        <h1>Characters within the Star Wars universe</h1>
        <Search onSearch={this.props.onSearch} />
      </header>
    );
  }
}

export default Header;
