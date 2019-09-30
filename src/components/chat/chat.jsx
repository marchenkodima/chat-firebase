import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatsList from '../chats-list';
import UserInfo from '../user-info';
import ChatWindow from '../chat-window';
import actions from '../../store/actions/actions';

const Chat = ({ getChatsList, getUserData }) => {
  useEffect(() => {
    getChatsList();
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
  getChatsList: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getChatsList: () => dispatch(actions.chatsListRequest()),
  getUserData: () => dispatch(actions.userDataRequest()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Chat);
