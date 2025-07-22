import React from 'react';
import type { DescriptionProps } from '../types/types';

const Card: React.FC<DescriptionProps> = (props) => {
  const { name, url } = props;

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>
        <strong>URL:</strong> {url}
      </p>
    </div>
  );
};

export default Card;
