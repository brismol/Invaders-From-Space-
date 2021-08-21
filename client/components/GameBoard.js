import React, { useState, useEffect, useRef } from 'react';
import { Cell } from './Cell';
import { useInterval } from './utils/useInterval';

export const GameBoard = () => {
  const board = new Array(20).fill('').map((row) => {
    return new Array(50).fill('');
  });

  const mob = [
    [1, 5],
    [1, 9],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
    [3, 3],
    [3, 4],
    [3, 6],
    [3, 7],
    [3, 8],
    [3, 10],
    [3, 11],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [4, 8],
    [4, 9],
    [4, 10],
    [4, 11],
    [4, 12],
    [5, 2],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
    [5, 10],
    [5, 12],
    [6, 2],
    [6, 4],
    [6, 10],
    [6, 12],
    [7, 5],
    [7, 9],
  ];

  const [alien, setAlien] = useState([]);

  //coordinates to strings making 112 could be 1,12 or 11, 2 etc... try converting to object

  useEffect(() => {
    const moveMob = setInterval(() => {
      if (alien.length) {
        const newAlien = alien.map((coord) => [coord[0], coord[1] + 1]);
        setAlien(newAlien);
      } else {
        setAlien(mob);
      }
    });
  });

  //   const moveMob = () => {

  //   };

  return (
    <div>
      <button
        onClick={() => {
          moveMob();
        }}
      >
        start
      </button>
      <div className="boardContainer">
        {board.map((row, ridx) => {
          return (
            <div className="flex gameBoard" key={ridx}>
              {row.map((cell, cidx) => (
                <Cell
                  key={[ridx, cidx]}
                  coordinates={[ridx, cidx]}
                  alien1={alien.map((coord) => coord.join(','))}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
