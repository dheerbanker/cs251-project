import React, { Component } from "react";
import ChatBubble from "./ChatBubble";

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
        {/* <div className="box">
            <div className="inner">
            </div>
        </div> */}
        {Array.isArray(messagesList) &&
        messagesList.map((oneMessage, index) => (
            oneMessage.username === this.props.username
              ? <ChatBubble message={oneMessage.message} key={index} username="You" bubbleType="from-me" />
              : <ChatBubble message={oneMessage.message} key={index} username={oneMessage.username} bubbleType="from-them" />
        ))}
        {/* define ref and call it if component is updated */}
        <div
        className="reference"
        ref={node => (this.messageListEnd = node)}
        />
      </div>
    );
  }
}
