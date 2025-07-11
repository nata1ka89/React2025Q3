import React from 'react';
import CardList from './card-list';
import type { MainState } from '../types/types';

class Main extends React.Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      searchValue: '',
    };
  }

  componentDidMount() {
    this.fetchData();
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
        console.log(data.results);
        this.setState({ items: data.results, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  handleSearch = (searchValue: string) => {
    this.setState({ searchValue });
    this.fetchData(searchValue);
  };

  render() {
    const { items, loading, error } = this.state;
    return (
      <main className="main">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <CardList items={items} />
      </main>
    );
  }
}

export default Main;
