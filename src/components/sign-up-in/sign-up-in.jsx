import React from 'react';
import PropTypes from 'prop-types';

const SignUpIn = ({ inputHandler, signUpIn, signUp = false }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    signUpIn();
  };

  return (
    <form onSubmit={submitHandler}>
      {signUp ? (
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={inputHandler}
        />
      ) : null}
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={inputHandler}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={inputHandler}
      />
      <button type="submit">{signUp ? 'Register' : 'Login'}</button>
    </form>
  );
};

SignUpIn.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  signUpIn: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
};
SignUpIn.defaultProps = {
  signUp: false,
};

export default SignUpIn;
