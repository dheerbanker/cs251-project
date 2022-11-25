import React, { Component } from "react";
import "./Chat.css";

import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";

export default class Chat extends Component {
  static CORRECT_GUESSED_IDENTIFIER = "!*crrctgss*!";
  static GAME_END_IDENTIFIER = "!*dsblchtbx*!"

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        // { username: "moriarty", message: "Game?" },
        // { username: "sherlock", message: "Game." },
        // { username: "watson", message: "No, no, just hold on a second" }
      ],
      chatbox_disabled: (this.props.chatbox_disabled!==undefined) ? this.props.chatbox_disabled : false,
    };

    console.log(`chatbox_disabled: ${this.props.chatbox_disabled}`);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.chatbox_disabled !== undefined && this.props.chatbox_disabled != this.state.chatbox_disabled){
      this.setState({
        chatbox_disabled: this.props.chatbox_disabled
      });
    }
  }
  
  componentDidMount(){
    // this.username = `user${Math.floor(Math.random()*100000)}`;
    // this.lobby = "room";
    if(this.props.username !== undefined) this.username = this.props.username;
    if(this.props.lobby !== undefined) this.lobby = this.props.lobby;
    
    // this.chat_server = new WebSocket('ws://127.0.0.1:8000/chat-connect/room/' + this.username)
    this.chat_server = new WebSocket(`ws://127.0.0.1:8000/chat-connect/${this.lobby}/${this.username}`);
    this.chat_server.onopen = () => {
    }

    this.chat_server.onmessage = (event) => {
      const new_msg = JSON.parse(event.data);
      // TODO: Add code here to check if the recieved message is of a special type (like a word-guessed-correctly special message) and call the correct procedure for the same
      if(new_msg.message.startsWith(Chat.GAME_END_IDENTIFIER)){
        this.setState({chatbox_disabled: true});
        if(this.props.onRefreshGameState !== undefined) this.props.onRefreshGameState();
        return;
      }
      if(new_msg.message.startsWith(Chat.CORRECT_GUESSED_IDENTIFIER)){
        let updatedMessages = [...this.state.messages, JSON.parse(event.data)]
        this.setState({
          messages: updatedMessages
        });
        return;
      }
      if(new_msg.username === this.username) return;
      let updatedMessages = [...this.state.messages, JSON.parse(event.data)]
      this.setState({
        messages: updatedMessages
      })
    }
  }

  submitted = getNewMessage => {
    if (getNewMessage.message !== "") {
      const newMessage = getNewMessage;
      let updatedMessages = [...this.state.messages, newMessage];
      this.setState({
        messages: updatedMessages
      });

      if(this.props.correct_word !== undefined && newMessage.message === this.props.correct_word){
        if(this.props.onCorrectGuess !== undefined) 
          this.props.onCorrectGuess()
          .then((val) => {
            this.chat_server.send(`${Chat.CORRECT_GUESSED_IDENTIFIER}${this.props.username} guessed the correct word!`);
            this.chat_server.send(Chat.GAME_END_IDENTIFIER);
          });
        /*TODO: Add code here to:
        - Handle score calculation
        - Request server to update game state, points, etc.
        */
       // call get on loadgame
        return;
      }
      else{
        //TODO: Add code here to not allow users to send special messages.
        this.chat_server.send(newMessage.message)
      }

    }
  };

  gameTimeOut = () => {
    if(this.state.username = this.state.drawer){
      this.props.onCorrectGuess()
      .then((val) => {
        this.chat_server.send(`${Chat.CORRECT_GUESSED_IDENTIFIER}${this.props.correct_word} is the correct word!`);
        this.chat_server.send(Chat.GAME_END_IDENTIFIER);
      });
    }
  }

  render() {
    return (
      <div className="chat-zone">
        <h1>Chat</h1>
        {/* send stored messages as props to chat window */}
        <ChatWindow messagesList={this.state.messages} username={this.props.username} correct_guess_identifier={Chat.CORRECT_GUESSED_IDENTIFIER} />
        {/* send submitted props to chat composer */}
        <ChatComposer submitted={this.submitted} username={this.props.username} disabled={this.state.chatbox_disabled} />
      </div>
    );
  }
}