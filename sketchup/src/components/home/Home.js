import React, {Component} from "react";
import { useNavigate } from "react-router-dom";

import {API} from '../../utils/Endpoints';

import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            warning_message: "",
            lobby_code: "",
            show_lobby_code_input: false,
            join_btn_text: "Join using code",
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
        .then((response) => response.status, (error) => {console.error(error);this.showWarning("Failed to login with the current username, please try again.")});
        return username_submission;
    }

    async onCreateLobbyClicked(event){
        // TODO: Add code to handle the clicking of creation of a new lobby
        var username_status = await this.onUsernameSubmitted();
        if(username_status === undefined) return;
        if(username_status === 200){
            var lobby_creation_response = await fetch(API.CREATE_LOBBY, {
                    method: 'GET',
                    body: JSON.stringify({player_name: this.state.username}),
            })
            .then((response) => response.json())
            .catch((error) => {console.error(error);});

            if(lobby_creation_response === undefined){
                this.showWarning("Lobby creation failed, please try again.");return;
            }

            if(lobby_creation_response.hasOwnProperty("lobby_code")){
                //TODO: Add code to launch a game instance with the respective lobby code and username
                alert(`Would now proceed to the game screen, lobbycode:${lobby_creation_response.lobby_code};username:${this.state.username}`);

                this.joinGame(this.state.username, lobby_creation_response.lobby_code);
                // var navigate = useNavigate();
                // navigate("/game", { username: this.state.username, lobby_code: lobby_creation_response.lobby_code});
                return;
            }else{
                this.showWarning("Unknown error occurred while attempting lobby creation, please try again.");return;
            }
        }else if(username_status === 403){
            this.showWarning(`Name ${this.state.username} is already taken, please choose another player name`);return;
        }else{
            this.showWarning("Unknown error occurred while attempting creation, please try again");return;
        }
    }

    showWarning = message => {
        this.setState({
            warning_message: message
        });
    }

    async onJoinLobbyClicked(event) {
        if(this.state.show_lobby_code_input){
            // Add code to handle lobby joining request
            var username_status = await this.onUsernameSubmitted();
            if(username_status === undefined) return;
            if(username_status === 200){
                var lobby_join_response = await fetch(API.CREATE_LOBBY, {
                        method: 'POST',
                        body: JSON.stringify({player_name: this.state.username, code: this.state.lobby_code}),
                })
                .then((response) => response.status)
                .catch((error) => {console.error(error);});

                if(lobby_join_response === undefined){
                    this.showWarning("Lobby join failed, please try again.");return;
                }

                if(lobby_join_response === 200){
                    //TODO: Add code to launch a game instance with the respective lobby code and username
                    alert(`Would now proceed to the game screen, lobbycode:${this.state.lobby_code};username:${this.state.username}`);

                    this.joinGame(this.state.username, this.state.lobby_code);
                    // var navigate = useNavigate();
                    // navigate("/game", { username: this.state.username, lobby_code: lobby_creation_response.lobby_code});
                    return;
                }else if(lobby_join_response === 400) { //TODO: Change this response code to 400, the correct one for this case
                    this.showWarning("Please provide a valid lobby code.");return;
                }else if(lobby_join_response === 403){
                    this.showWarning(`Lobby with code ${this.state.lobby_code} does not exist. Please ensure you are using the correct code.`);return;
                }else{
                    this.showWarning("Unknown error occurred while attempting lobby creation, please try again.");return;
                }
            }else if(username_status === 403){
                this.showWarning(`Name ${this.state.username} is already taken, please choose another player name`);return;
            }else{
                this.showWarning("Unknown error occurred while attempting joining, please try again");return;
            }
        }else{
            this.setState({
                show_lobby_code_input: !this.state.show_lobby_code_input,
                join_btn_text: "Join!",
            });
        }
    }

    joinGame(name, code){
        // var navigate = useNavigate();
        this.props.navigate("/game", { username: name, lobby_code: code});
        return;
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
                    <button className="btn btn-primary" id="join-lobby-btn" onClick={this.onJoinLobbyClicked}>{this.state.join_btn_text}</button>
                    <br/>
                    {this.state.show_lobby_code_input && <input type="text" id="lobby-code-in" placeholder="Lobby Code" value={this.state.lobby_code} onChange={this.onLobbyCodeChanged} />}
                </div>
                <br/>
                {!(this.state.warning_message === "") && <p className="text-danger" id="warning-msg-p">{this.state.warning_message}</p>}
            </div>
        )
    }
}

export default function(props){
    const nav = useNavigate();

    return(<Home {...props} navigate={nav}/>);
}