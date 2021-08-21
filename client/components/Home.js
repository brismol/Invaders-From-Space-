import React from 'react';
import { connect } from 'react-redux';
import { GameBoard } from './GameBoard';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <div>
        <h3>Welcome, {username}</h3>
      </div>
      <GameBoard />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
