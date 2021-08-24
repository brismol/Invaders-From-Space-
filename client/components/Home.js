import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BrickBreakers from './BrickBreakers';

const Home = ({ username }) => {
  return (
    <div>
      <div>
        <h1>Welcome, {username}</h1>
      </div>
      <div>
        <Link to="/brickbreakers">Play Brick Breakers!</Link>
      </div>
      <div>
        <Link to="/oldboard">Show old board</Link>
      </div>
      <div>
        <Link to="/drawingboard">Drawing Board</Link>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
