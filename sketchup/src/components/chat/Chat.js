import React, { Component } from "react";
import "./Chat.css";

import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { username: "moriarty", message: "Game?" },
        { username: "sherlock", message: "Game." },
        { username: "watson", message: "No, no, just hold on a second" }
      ]
    };

    this.username = "watson";
  }

  // if new message was submitted from child component // process
  submitted = getNewMessage => {
    if (getNewMessage.message !== "") {
      // match the state format
      const newMessage = getNewMessage;
      // merge new message in copy of state stored messages
      let updatedMessages = [...this.state.messages, newMessage];
      // update state
      this.setState({
        messages: updatedMessages
      });
    }
  };

  render() {
    return (
      <div className="chat-zone">
        <h1>Chat</h1>
        {/* send stored messages as props to chat window */}
        <ChatWindow messagesList={this.state.messages} username={this.username} />
        {/* send submitted props to chat composer */}
        <ChatComposer submitted={this.submitted} username={this.username} />
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);