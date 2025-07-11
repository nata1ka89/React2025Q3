import React from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
