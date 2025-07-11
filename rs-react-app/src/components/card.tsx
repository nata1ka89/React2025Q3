import React from 'react';
import type { CardProps } from '../types/types';

class Card extends React.Component<CardProps> {
  render() {
    const { name, url } = this.props;

    return (
      <div className="card">
        <h3>{name}</h3>
        <p>{url}</p>
      </div>
    );
  }
}

export default Card;
