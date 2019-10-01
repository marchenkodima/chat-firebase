import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';

const MessageInput = ({
  inputHandler, messageHandler, message, chatId,
}) => {
  const inputChange = (e) => {
    inputHandler(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    messageHandler(message, chatId);
  };

  return (
    <form onSubmit={sendMessage}>
      <input type="text" onChange={inputChange} />
      <button type="submit">Send</button>
    </form>
  );
};

MessageInput.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  messageHandler: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ chat: { activeChat: { id } }, message: { message } }) => ({
  chatId: id,
  message,
});

const mapDispatchToProps = (dispatch) => ({
  inputHandler: (message) => dispatch(actions.messageInputChange(message)),
  messageHandler: (message, chatId) => dispatch(actions.messageSendRequest(message, chatId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
