import React from 'react';
import Search from './search';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
}
const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="header">
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <h1>Characters within the Star Wars universe</h1>
      <Search onSearch={onSearch} />
    </header>
  );
};

export default Header;
