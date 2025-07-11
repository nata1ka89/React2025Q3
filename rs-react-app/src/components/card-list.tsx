import React from 'react';
import Card from './card';
import type { CardListProps } from '../types/types';

class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div className="card-list">
        {items.map((item, index) => (
          <Card key={index} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}

export default CardList;
