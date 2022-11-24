import {Component} from "react";

import ScoreBoard from "../scoreboard/ScoreBoard";
import Chat from "../chat/Chat";
import Canvas from "../canvas/Canvas";

import './MainGame.css'

export default class MainGame extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            cur_word: "LookAtMe",
            chat_allowed: true,
            draw_allowed: true,
        };
    }

    refreshGameState(){
        /* TODO: Add code here to:
        - Get new word, drawer, scores
        - Update the canvas and chatbox status accordingly (drawer shouldn't be accessing chat, guessers shouldn't be accessing canvas)
        */
    }

    render(){
        return(
            <div className="row" id="main-game-container">
                <div className="col-lg-2" id="game-scoreboard-container">
                    <ScoreBoard />
                </div>
                <div className="col-lg-7" id="game-draw-container">
                    <div className="row">
                        <div className="col" id="game-word-container">
                            {this.state.cur_word}
                        </div>
                        <div className="w-100"></div>
                        <div className="col" id="game-canvas-container">
                            <Canvas dim={{height: "100%", width: "100%"}}  drawAllowed={this.state.draw_allowed}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" id="game-chat-container">
                    <Chat chatbox_disabled={!this.state.chat_allowed} />
                </div>
            </div>
        )
    }
}