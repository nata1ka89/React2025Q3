import React from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import ErrorBoundary from './components/error-boundary ';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <Header />
          <Main />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
