import React from 'react';
import type { DetailProps } from '../types/types';

const Detail: React.FC<DetailProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="detail">
      <button onClick={onClose}>Close</button>
      <h3>{item.name}</h3>
      <p>
        <strong>Gender:</strong> {item.gender}
      </p>
      <p>
        <strong>Height:</strong> {item.height}
      </p>
      <p>
        <strong>Mass:</strong> {item.mass}
      </p>
      <p>
        <strong>Birth Year:</strong> {item.birth_year}
      </p>
      <p>
        <strong>Skin Color:</strong> {item.skin_color}
      </p>
      <p>
        <strong>Hair Color:</strong> {item.hair_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {item.eye_color}
      </p>
      <p>
        <strong>Home world:</strong> {item.homeworld}
      </p>
    </div>
  );
};

export default Detail;
