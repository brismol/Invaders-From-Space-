import React, { useState } from 'react';

export const Cell = ({ coordinates }) => {
  const [live, setlive] = useState(false);
  console.log(coordinates);

  const color = () => {
    console.log(coordinates);
    setlive(!live);
  };

  let classes = 'cell';
  if (live) {
    classes = classes + ' live';
  }

  return <div className={classes} onClick={color}></div>;
};
