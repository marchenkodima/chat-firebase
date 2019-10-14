import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageInput from '../message-input';
import actions from '../../store/actions/actions';

const ChatWindow = ({
  chat, messages, isLoaded, loadMoreMessages,
}) => {
  useEffect(() => {
    if (isLoaded && messages.length < 50) {
      loadMoreMessages(chat.id);
    }
  });

  if (!isLoaded) {
    return null;
  }

  const scrollHandler = (e) => {
    if (e.target.scrollTop === 0) {
      loadMoreMessages(chat.id);
    }
  };

  const { name, avatar, users } = chat;

  const Messages = () => {
    const messagesRef = useRef(null);

    useEffect(() => {
      messagesRef.current.scrollTo(0, messagesRef.current.clientHeight);
    });

    return (
      <div style={{ height: '400px', overflowY: 'scroll' }} onScroll={scrollHandler} ref={messagesRef}>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.message}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <p>{name}</p>
      <img src={avatar} alt="chatImage" />
      <Messages />
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
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  messages: PropTypes.arrayOf(PropTypes.object),
  isLoaded: PropTypes.bool.isRequired,
  loadMoreMessages: PropTypes.func.isRequired,
};

ChatWindow.defaultProps = {
  chat: PropTypes.any,
  messages: PropTypes.any,
};

const mapStateToProps = ({
  chat: { currentChatId, chats, isLoaded: isChatsLoaded },
  messages: { messages, isLoaded: isMessagesLoaded },
}) => {
  const isLoaded = isMessagesLoaded && isChatsLoaded && currentChatId.length !== 0;
  return {
    chat: isLoaded ? chats.find((el) => el.id === currentChatId) : null,
    messages: isLoaded ? messages[currentChatId] : null,
    isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadMoreMessages: (chatId) => dispatch(actions.moreMessagesRequest(chatId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatWindow);
