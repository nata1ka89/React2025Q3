import React from 'react';
import Card from './card';
import type { CardListProps } from '../types/types';

const CardList: React.FC<CardListProps> = ({ items, onSelect }) => {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <div key={index} onClick={() => onSelect(item)}>
          <Card {...item} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
