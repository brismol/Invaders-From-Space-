import React, { useState } from 'react';

export const Cell = ({ coordinates, alien1 }) => {
  const [live, setlive] = useState(false);
  const [location, setlocation] = useState('');

  const color = () => {
    setlocation(coordinates);
    setlive(!live);
  };

  let classes = 'cell';
  if (alien1.includes(coordinates.join(''))) {
    classes = classes + ' live';
  }

  return (
    <div className={classes} onClick={color}>
      {location}
    </div>
  );
};
