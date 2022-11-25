import {Component} from "react";

import ScoreBoard from "../scoreboard/ScoreBoard";
import Chat from "../chat/Chat";
import Canvas from "../canvas/Canvas";

import './MainGame.css'
import {API} from '../../utils/Endpoints';
import { useLocation } from "react-router-dom";

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
            drawer: ""
        };
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
                    new_w = data.word ? data.word : this.state.cur_word;
                    new_sc = data.scoreboard ? data.scoreboard : this.state.scoreboard;
                    new_d = data.drawer ? data.drawer : this.state.drawer;

                    this.setState({
                        cur_word: new_w,
                        scoreboard: new_sc,
                        drawer: new_d,
                    });
            })
            .catch((error) => {console.log(error);});
        }, 2000);
    }

    requestStateRefresh = () => {
        fetch(API.REFRESH_GAME_STATE + `?code=${this.state.lobby_code}`)
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
                        Playing Game
                    </div>
                    <div className="col">
                        Any more information required to be put up
                    </div>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-2" id="game-scoreboard-container">
                    <ScoreBoard score_list={this.state.scoreboard}/>
                </div>
                <div className="col-lg-7" id="game-draw-container">
                    <div className="row">
                        <div className="col" id="game-word-container">
                            {this.state.cur_word}
                        </div>
                        <div className="w-100"></div>
                        <div className="col" id="game-canvas-container">
                            <Canvas dim={{height: "100%", width: "100%"}}  drawAllowed={this.state.drawer === this.state.username} lobby_code={this.state.lobby_code} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" id="game-chat-container">
                    <Chat chatbox_disabled={this.state.drawer === this.username} />
                </div>
            </div>
        )
    }
}

export default function(props){
    const loc = useLocation();

    return(<MainGame {...props} location={loc}/>)
}