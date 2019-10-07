import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatsList from '../chats-list';
import UserInfo from '../user-info';
import ChatWindow from '../chat-window';
import actions from '../../store/actions/actions';

const Chat = ({ getChatsData, getUserData }) => {
  useEffect(() => {
    getChatsData();
    getUserData();
  });

  return (
    <>
      <UserInfo />
      <ChatsList />
      <ChatWindow />
    </>
  );
};

Chat.propTypes = {
  getChatsData: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getChatsData: () => dispatch(actions.chatDataRequest()),
  getUserData: () => dispatch(actions.userDataRequest()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Chat);
