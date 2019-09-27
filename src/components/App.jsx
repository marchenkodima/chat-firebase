import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Authorize from './authorize';
import Chat from './chat';

function App({ userId }) {
  return (
    <div className="App">
      <Authorize login={false} />
      {userId.length ? <Chat /> : null}
    </div>
  );
}

App.propTypes = {
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { userId } }) => ({
  userId,
});

export default connect(mapStateToProps)(App);
