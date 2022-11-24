import React, { Component } from "react";
import ChatBubble from "./ChatBubble";
import SpecialBubble from "./SpecialBubble";

// we are using class component here bcoz functional components cant use react life cycle hooks such as componentDidUpdate
export default class ChatWindow extends Component {
  // if this component received new props, move scroll chat window
  // to view latest message
  componentDidUpdate = (prevProps, prevState) => {
    // if component received new props
    if (this.props.messagesList !== prevProps.messagesList) {
      // call ref and scroll
      this.messageListEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    // messagesList the got the messages stored in state
    // destructuring
    const { messagesList } = this.props;
      return(
      <div className="chat-window">
        {Array.isArray(messagesList) &&
        messagesList.map((oneMessage, index) => (
            oneMessage.message.startsWith(this.props.correct_guess_identifier)
              ? <SpecialBubble message={oneMessage.message.slice(this.props.correct_guess_identifier.length)} bubble_shade="#008000" key={index} />
              :(
                oneMessage.username === this.props.username
                  ? <ChatBubble message={oneMessage.message} key={index} username="You" bubbleType="from-me" />
                  : <ChatBubble message={oneMessage.message} key={index} username={oneMessage.username} bubbleType="from-them" />
              )
        ))}
        <div
        className="reference"
        ref={node => (this.messageListEnd = node)}
        />
      </div>
    );
  }
}
