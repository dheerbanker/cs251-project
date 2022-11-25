import React, {Component} from "react";
import { useNavigate } from "react-router-dom";

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
            return;
        }

        var username_submission = fetch(API.CHOOSE_USERNAME,{
            method: 'POST',
            body: JSON.stringify({player_name: this.state.username}),
        })
        .then((response) => response.status, (error) => {console.error(error);});
        return username_submission;
    }

    async onCreateLobbyClicked(event){
        // TODO: Add code to handle the clicking of creation of a new lobby
        username_status = await this.onUsernameSubmitted();
        if(username_status === 200){
            lobby_creation_response = await fetch(API.CREATE_LOBBY, {
                    method: 'GET',
                    body: JSON.stringify({player_name: this.state.username}),
            }).then((response) => response.json());

            if(lobby_creation_response.hasOwnProperty("lobby_code")){
                //TODO: Add code to launch a game instance with the respective lobby code and username
                var navigate = useNavigate();
                navigate("/game", { username: this.state.username, lobby_code: lobby_creation_response.lobby_code});
                // alert(`Would now proceed to the game screen, lobbycode:${lobby_creation_response.lobby_code};username:${this.state.username}`);
            }else{
                this.setState({
                    warning_message: "Unknown error occurred while attempting lobby creation, please try again",
                });
            }
        }else if(username_status === 403){
            this.setState({
                warning_message: `Name ${this.state.username} is already taken, please choose another player name`
            });
        }else{
            this.setState({
                warning_message: "Unknown error occurred while attempting login, please try again"
            })
        }
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