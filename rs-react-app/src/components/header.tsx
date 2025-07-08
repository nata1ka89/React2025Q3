import React from 'react';
import Search from './search';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Search />
      </header>
    );
  }
}

export default Header;
