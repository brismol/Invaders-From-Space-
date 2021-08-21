import React from 'react';
import { Cell } from './Cell';

export const GameBoard = () => {
  const board = new Array(10).fill('').map((row) => {
    return new Array(10).fill('');
  });

  return (
    <div className="boardContainer">
      {board.map((row, ridx) => {
        return (
          <div className="flex gameBoard" key={ridx}>
            {row.map((cell, cidx) => (
              <Cell key={[ridx, cidx]} coordinate={[ridx, cidx]} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
