import React, { useState } from 'react';

export const Cell = ({ coordinates, alien1 }) => {
  const [live, setlive] = useState(false);
  const [location, setlocation] = useState('');

  const color = () => {
    setlocation(coordinates);
    setlive(!live);
  };

  // if (alien1.includes(coordinates.join(','))) {
  //   classes = classes + ' live';
  // }

  let classes = 'cell';
  if (live) {
    classes = 'cell live';
  }

  return (
    <div className={classes} onClick={color}>
      {location}
    </div>
  );
};
