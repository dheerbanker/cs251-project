import React, {Component} from "react";

import './Home.css';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            warning_message: "",
            lobby_code: "",
            show_lobby_code_input: false
        }
    }

    onLobbyCodeChanged = event => {
        this.setState({
            lobby_code: event.target.value
        })
    }

    onUsernameChanged = event => {
        this.setState({
            username: event.target.value
        });
    }
    onUsernameSubmitted(){
        if(this.state.username === ""){
            this.showWarning("Can't have an empty username");
        }
    }

    onCreateLobbyClicked(event){
        // TODO: Add code to handle the clicking of creation of a new lobby
    }

    showWarning = message => {
        this.setState({
            warning_message: message
        });
    }

    onJoinLobbyClicked = event => {
        if(this.state.show_lobby_code_input){
            // Add code to handle lobby joining request
        }else{
            this.setState({
                show_lobby_code_input: !this.state.show_lobby_code_input
            });
        }
    }

    render(){
        return(
            <div id="home-container">
                <h1 id="game-heading">SketchUp</h1>
                <div id="play-form">
                    <input type="text" id="username-in" placeholder="Player Name" value={this.state.username} onChange={this.onUsernameChanged} />
                    <br/>
                    <button className="btn btn-primary" id="create-lobby-btn" onClick={this.onCreateLobbyClicked}>Create Lobby</button>
                    <br/>
                    <button className="btn btn-primary" id="join-lobby-btn" onClick={this.onJoinLobbyClicked}>Join Lobby</button>
                    <br/>
                    {this.state.show_lobby_code_input && <input type="text" id="lobby-code-in" placeholder="Lobby Code" value={this.state.lobby_code} onChange={this.onLobbyCodeChanged} />}
                </div>
                <br/>
                {!(this.state.warning_message === "") && <p className="text-danger" id="warning-msg-p">{this.state.warning_message}</p>}
            </div>
        )
    }
}