import React from 'react';
import PropTypes from 'prop-types';

const ChatsList = ({ chats }) => {
  const time = (chat) => {
    const seconds = Date.now() / 1000 - chat.latestMessage.time.seconds;
    if (seconds < 30) {
      return 'now';
    }
    if (seconds < 60) {
      return `${seconds} s`;
    }
    if (seconds < 3600) {
      return `${seconds / 60} min`;
    }
    if (seconds < 3600 * 24) {
      return `${seconds / 3600} h`;
    }
    if (seconds < 3600 * 48) {
      return 'yesterday';
    }
    const date = new Date(chat.latestMessage.time.seconds * 1000);
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.chatId}>
          <p>{chat.name}</p>
          <p>{chat.latestMessage.message}</p>
          <p>{time(chat)}</p>
        </li>
      ))}
    </ul>
  );
};

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChatsList;
