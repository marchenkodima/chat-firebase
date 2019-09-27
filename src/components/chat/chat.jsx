import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';
import ChatsList from '../chats-list';

const Chat = ({ chats, getUserData }) => {
  useEffect(() => {
    if (!chats.length) {
      getUserData();
    }
  });

  return (
    <ChatsList chats={chats} />
  );
};

Chat.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user: { chats } }) => ({
  chats,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(actions.userDataRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
