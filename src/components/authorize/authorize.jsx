import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';
import SignUpIn from '../sign-up-in';

const Authorize = ({
  inputHandler, signIn, signUp, name, email, password,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? (
        <SignUpIn
          inputHandler={inputHandler}
          signUpIn={signUp(email, password, name)}
          signUp
        />
      ) : (
        <SignUpIn
          inputHandler={inputHandler}
          signUpIn={signIn(email, password)}
        />
      )}
      <button
        type="button"
        onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
      >
        {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  );
};

Authorize.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  signIn: PropTypes.func,
  signUp: PropTypes.func,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
Authorize.defaultProps = {
  signIn: null,
  signUp: null,
};

const inputHandler = (e) => {
  const { value } = e.target;
  const { name } = e.target;
  return actions.authInputChange(name, value);
};

const mapDispatchToProps = (dispatch) => ({
  inputHandler: (e) => dispatch(inputHandler(e)),
  signIn: (email, password) => () => dispatch(actions.signInUser(email, password)),
  signUp: (email, password, name) => () => dispatch(actions.signUpUser(email, password, name)),
});

const mapStateToProps = ({ authorize: { name, email, password } }) => ({
  name,
  email,
  password,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authorize);
