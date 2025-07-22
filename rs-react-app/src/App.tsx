import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import ErrorBoundary from './components/error-boundary ';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Main searchValue={searchValue} />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
