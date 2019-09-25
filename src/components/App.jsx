import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../store/actions/actions';

function App({ createUser }) {
  useEffect(() => {
    createUser();
  });

  return <div className="App">Hello</div>;
}

App.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createUser: () => dispatch(actions.createUser('abssssscde@gmail.com', '123456')),
});

export default connect(null, mapDispatchToProps)(App);
