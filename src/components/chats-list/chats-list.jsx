import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';

const ChatsList = ({
  chats, messages, isLoaded, openChat,
}) => {
  const time = (message) => {
    const milliseconds = message.time.seconds * 1000;
    const serverOffset = new Date(milliseconds).getTimezoneOffset() * 60000;
    const localeOffset = new Date(Date.now()).getTimezoneOffset() * 60000;
    const date = new Date(milliseconds + localeOffset - serverOffset);
    if (Date.now() - (milliseconds - serverOffset) < 24 * 3600 * 1000) {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.id}>
          <button type="button" onClick={() => openChat(chat.id)}>
            <p>{chat.name}</p>
            <p>{messages[chat.id][messages[chat.id].length - 1].message}</p>
            <p>{time(messages[chat.id][messages[chat.id].length - 1])}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object),
  messages: PropTypes.objectOf(PropTypes.array),
  openChat: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

ChatsList.defaultProps = {
  chats: PropTypes.any,
  messages: PropTypes.any,
};

const mapStateToProps = ({
  chat: { chats, isLoaded: isChatsLoaded },
  messages: { messages, isLoaded: isMessagesLoaded },
}) => ({
  chats,
  messages,
  isLoaded: isChatsLoaded && isMessagesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  openChat: (chatId) => dispatch(actions.currentChatChange(chatId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatsList);
