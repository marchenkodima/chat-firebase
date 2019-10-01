import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageInput from '../message-input';

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return null;
  }

  const {
    name, avatar, messages, users,
  } = chat;

  return (
    <div>
      <p>{name}</p>
      <img src={avatar} alt="chatImage" />
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <MessageInput />
    </div>
  );
};

ChatWindow.propTypes = {
  chat: PropTypes.shape({
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

ChatWindow.defaultProps = {
  chat: PropTypes.any,
};

const mapStateToProps = ({ chat: { activeChat } }) => ({
  chat: activeChat,
});

export default connect(mapStateToProps)(ChatWindow);
