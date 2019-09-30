import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserInfo = ({ avatar, name, online }) => (
  <div>
    <img src={avatar} alt="avatar" />
    <h1>{name}</h1>
    <p>{online ? 'online' : 'offline'}</p>
  </div>
);

UserInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user: { avatar, name, online } }) => ({
  avatar,
  name,
  online,
});

export default connect(mapStateToProps)(UserInfo);
