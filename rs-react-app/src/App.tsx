import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import ErrorBoundary from './components/error-boundary ';

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <Header onSearch={handleSearch} />
        <Main searchValue={searchValue} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
