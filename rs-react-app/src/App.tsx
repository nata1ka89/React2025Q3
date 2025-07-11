import React from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import ErrorBoundary from './components/error-boundary ';

interface AppState {
  searchValue: string;
}
class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleSearch = (searchValue: string) => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <ErrorBoundary>
        <div className="container">
          <Header onSearch={this.handleSearch} />
          <Main searchValue={searchValue} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
