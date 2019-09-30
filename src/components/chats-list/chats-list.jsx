import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';

const ChatsList = ({ chatsList, getChatData }) => {
  const time = (chat) => {
    const seconds = Date.now() / 1000 - chat.latestMessage.time.seconds;
    if (seconds < 30) {
      return 'now';
    }
    if (seconds < 60) {
      return `${seconds} s`;
    }
    if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} min`;
    }
    if (seconds < 3600 * 24) {
      return `${Math.floor(seconds / 3600)} h`;
    }
    if (seconds < 3600 * 48) {
      return 'yesterday';
    }
    const date = new Date(chat.latestMessage.time.seconds * 1000);
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

  if (!chatsList) {
    return null;
  }

  return (
    <ul>
      {chatsList.map((chat) => (
        <li key={chat.chatId}>
          <button type="button" onClick={() => getChatData(chat.chatId)}>
            <p>{chat.name}</p>
            <p>{chat.latestMessage.message}</p>
            <p>{time(chat)}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

ChatsList.propTypes = {
  chatsList: PropTypes.arrayOf(PropTypes.object),
  getChatData: PropTypes.func.isRequired,
};

ChatsList.defaultProps = {
  chatsList: PropTypes.any,
};

const mapStateToProps = ({ chatsList: { chatsList } }) => ({
  chatsList,
});

const mapDispatchToProps = (dispatch) => ({
  getChatData: (chatId) => dispatch(actions.chatDataRequest(chatId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatsList);
