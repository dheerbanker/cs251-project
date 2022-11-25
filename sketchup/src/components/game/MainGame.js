import {Component} from "react";

import ScoreBoard from "../scoreboard/ScoreBoard";
import Chat from "../chat/Chat";
import Canvas from "../canvas/Canvas";

import './MainGame.css'
import API from '../../utils/Endpoints';
import { useLocation } from "react-router-dom";
import {Navigate} from "react-router-dom";

class MainGame extends Component {
    constructor(props){
        super(props);
    
        // var {username, lobby_code} = useLocation();
        var {username, lobby_code} = this.props.location.state;
        if(username === undefined || lobby_code === undefined){this.state={error:"Received execution-critical information as null"};return;}

        this.state = {
            username: username,
            lobby_code: lobby_code,
            cur_word: "LookAtMe",
            scoreboard: [],
// might be problematic
// PROBLEM
            drawer: ""
        };
        
        this.refreshGameState();
    }

    refreshGameState = () => {
        /* 
        TODO: Add code here to:
        - Get new word, drawer, scores
        - Update the canvas and chatbox status accordingly (drawer shouldn't be accessing chat, guessers shouldn't be accessing canvas)
        */
       setTimeout(() => {
            fetch(API.GAME_STATE + `?code=${this.state.lobby_code}`)
            .then((response) => response.json())
            .then((data) => {
                    if(!(data.hasOwnProperty("word") || data.hasOwnProperty("scoreboard") || data.hasOwnProperty("drawer"))) console.error("Found no relevant data in refresh game API call");
                    let new_w = this.state.cur_word;
                    let new_sc = this.state.scoreboard;
                    let new_d = this.state.drawer;
                    if(data.hasOwnProperty("word")) new_w = data.word;
                    if(data.hasOwnProperty("scoreboard")){
                        new_sc = data.scoreboard;
                    }
                    if(data.hasOwnProperty("drawer")) new_d = data.drawer;
                    
                    this.setState({
                        cur_word: new_w,
                        scoreboard: new_sc,
                        drawer: new_d,
                    }).then(() => {
                        if(this.state.drawer == ""){
                            <Navigate to="/finalScore" replace={true} />
                        }
                    }
                    );


                    console.log("State successfully updated");
            })
            .catch((error) => {console.log(error);});
        }, 2000);
    }

    updateScoreBoard = async () => {
        fetch(API.GAME_STATE + `?code=${this.state.lobby_code}`)
        .then((response) => response.json())
        .then((data) => {
            if(!(data.hasOwnProperty("word") || data.hasOwnProperty("scoreboard") || data.hasOwnProperty("drawer"))) console.error("Found no relevant data in updateScoreBoard");
            let new_sc = this.state.scoreboard;
            return new_sc
        })
    }

    requestStateRefresh = () => {
        return fetch(API.REFRESH_GAME_STATE + `?code=${this.state.lobby_code}`)
        .catch((error) => {console.error(`Failed to request game state refresh: ${error}`);});
    }

    render(){
        return(
            <div className="row" id="main-game-container">
                <div id="game-information-bar" className="row">
                    <div className="col">
                        Lobby Code: {this.state.lobby_code}
                    </div>
                    <div className="col">
                        Drawing: {this.state.drawer}
                    </div>
                    <div className="col">
                        Any more information required to be put up
                    </div>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-2" id="game-scoreboard-container">
                    <ScoreBoard score_list={this.state.scoreboard} updateScoreBoard={this.updateScoreBoard}/>
                </div>
                <div className="col-lg-7" id="game-draw-container">
                    <div className="row">
                        <div className="col" id="game-word-container">
                            Word: {this.state.cur_word}
                        </div>
                        <div className="w-100"></div>
                        <div className="col" id="game-canvas-container">
                            <Canvas dim={{height: 'auto', width: 'auto'}}  drawAllowed={this.state.drawer === this.state.username} lobby_code={this.state.lobby_code} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" id="game-chat-container">
                    <Chat onRefreshGameState={this.refreshGameState} username={this.state.username} onCorrectGuess={this.requestStateRefresh} chatbox_disabled={this.state.drawer === this.state.username} correct_word={this.state.cur_word} />
                </div>
            </div>
        )
    }
}

export default function(props){
    const loc = useLocation();

    return(<MainGame {...props} location={loc}/>)
}