import React from 'react';
import CardList from './card-list';
import type { CharacterResult, MainState } from '../types/types';

interface MainProps {
  searchValue: string;
}
class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      throwError: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.fetchData(this.props.searchValue);
    }
  }

  fetchData = (searchValue: string = '') => {
    this.setState({ loading: true, error: null });
    const url = searchValue
      ? `https://swapi.tech/api/people/?name=${searchValue}`
      : `https://swapi.tech/api/people`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          console.log(data.results);
          this.setState({ items: data.results, loading: false });
        } else {
          console.log(data.result);
          const items = data.result.map(
            (item: CharacterResult) => item.properties
          );
          this.setState({ items, loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  handleThrowError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { items, loading, error, throwError } = this.state;
    if (throwError) {
      throw new Error('Test error from Main component');
    }
    return (
      <main className="main">
        {loading && <div>Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        <button onClick={this.handleThrowError}>Throw Error</button>
        <CardList items={items} />
      </main>
    );
  }
}

export default Main;
