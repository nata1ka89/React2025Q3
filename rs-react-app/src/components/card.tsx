import React from 'react';
import type { CardProps, DescriptionProps } from '../types/types';

class Card extends React.Component<CardProps | DescriptionProps> {
  render() {
    const { ...item } = this.props;

    if ('gender' in item) {
      return (
        <div className="card">
          <h3>{item.name}</h3>
          <p>URL: {item.url}</p>
          <p>Gender: {item.gender}</p>
          <p>Height: {item.height}</p>
          <p>Mass: {item.mass}</p>
          <p>Birth Year: {item.birth_year}</p>
          <p>Skin Color: {item.skin_color}</p>
          <p>Hair Color: {item.hair_color}</p>
          <p>Eye Color: {item.eye_color}</p>
          <p>Home world: {item.homeworld}</p>
        </div>
      );
    } else {
      return (
        <div className="card">
          <h3>{item.name}</h3>
          <p>URL: {item.url}</p>
        </div>
      );
    }
  }
}

export default Card;
