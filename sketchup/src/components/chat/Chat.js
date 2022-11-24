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

    this.username = `user${Math.floor(Math.random()*100000)}`;

    this.chat_server = new WebSocket('ws://127.0.0.1:8000/chat-connect/room/' + this.username)
  }
  


  componentDidMount(){
    this.chat_server.onopen = () => {
      console.log("connected to the chat server")
    }

    this.chat_server.onmessage = (event) => {
      const new_msg = JSON.parse(event.data);
      if(new_msg.username === this.username) return;
      console.debug(`Received`)
      let updatedMessages = [...this.state.messages, JSON.parse(event.data)]
      this.setState({
        messages: updatedMessages
      })
    }
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

      this.chat_server.send(newMessage.message)
      console.debug(`Sent message ${newMessage.message}`)
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