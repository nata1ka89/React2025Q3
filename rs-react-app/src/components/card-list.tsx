import React from 'react';
import Card from './card';
import type { CardListProps } from '../types/types';

const CardList: React.FC<CardListProps> = (props) => {
  const { items } = props;

  return (
    <div className="card-list">
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default CardList;
