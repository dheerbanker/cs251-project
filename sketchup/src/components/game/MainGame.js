import {Component} from "react";
import React from "react";

import ScoreBoard from "../scoreboard/ScoreBoard";
import Chat from "../chat/Chat";
import Canvas from "../canvas/Canvas";

import './MainGame.css'
import API from '../../utils/Endpoints';
import { useLocation, useNavigate } from "react-router-dom";
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
            cur_word: "_",
            scoreboard: [],
            timer: 0,
            creation_time:"",
// might be problematic
// PROBLEM
            drawer: "_"
        };
        
        this.child = React.createRef();
        this.refreshGameState();
        
    }

    componentDidMount(){
        setInterval(
            this.refreshGameState
        ,10000)

        setInterval(
            this.updateTime
            ,1000
        )

    }


    updateTime = () => {
        if(this.state.timer < 0){
            this.child.current.gameTimeOut();
        }
        if(this.state.creation_time != ""){
            // console.debug("Updating time now");

            let curr_time = new Date()
            let intial_time = new Date(this.state.creation_time)
            this.setState({
                timer : 120-Math.floor((curr_time.getTime() - intial_time.getTime())/1000)
            }) 
            // console.log(intial_time)
        }
    }

    refreshGameState = () => {
       setTimeout(() => {
            fetch(API.GAME_STATE + `?code=${this.state.lobby_code}`)
            .then((response) => response.json())
            .then((data) => {
                    if(!(data.hasOwnProperty("word") || data.hasOwnProperty("scoreboard") || data.hasOwnProperty("drawer"))) console.error("Found no relevant data in refresh game API call");
                    let new_w = this.state.cur_word;
                    let new_sc = this.state.scoreboard;
                    let new_d = this.state.drawer;
                    let new_time = this.state.creation_time;
                    if(data.hasOwnProperty("word")) new_w = data.word;
                    if(data.hasOwnProperty("scoreboard")){
                        new_sc = data.scoreboard;
                    }
                    if(data.hasOwnProperty("drawer")) new_d = data.drawer;
                    if(data.hasOwnProperty("creation_time")) new_time = data.creation_time;
                    
                    this.setState({
                        cur_word: new_w,
                        scoreboard: new_sc,
                        drawer: new_d,
                        creation_time: new_time,
                    });

                    // console.log("State successfully updated");
            })
            .catch((error) => {console.error(error);});
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.drawer === "") this.props.navigate("/finalScore", {state:{score_list:this.state.scoreboard}, replace:true});
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
        
        console.log(API.UPDATE_SCORE);
        return fetch(API.UPDATE_SCORE, 
            {
                method:'POST',
                body:JSON.stringify({
                    update_player: this.state.username,
                    score: Math.floor(100*Math.exp((this.state.timer-100)/120)),
                })
            }
        )
        .then((response) => {
            // console.log(response);
            return fetch(API.REFRESH_GAME_STATE + `?code=${this.state.lobby_code}`)
            .catch((error) => {console.error(`Failed to request game state refresh: ${error}`);});
        })
        .catch((error) => {console.error(`Failed to update score: ${error}`)});
        
    }

    dashedWord = (undashed_word) => {
        return `_${Array(undashed_word.length).join(" _")}`;
    }

    render(){
        return(
            <div className="row" id="main-game-container">
                <div id="game-information-bar" className="row">
                    <div className="col">
                        Lobby Code: {this.state.lobby_code}
                    </div>
                    <div className="col">
                        Time: <b>{this.state.timer}</b>
                    </div>
                    <div className="col">
                        Drawer: <b>{this.state.drawer}</b>
                    </div>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-2" id="game-scoreboard-container">
                    <ScoreBoard score_list={this.state.scoreboard} updateScoreBoard={this.updateScoreBoard}/>
                </div>
                <div className="col-lg-7" id="game-draw-container">
                    <div className="row">
                        <div className="col" id="game-word-container">
                            {this.state.username===this.state.drawer ? this.state.cur_word : this.dashedWord(this.state.cur_word)}
                        </div>
                        <div className="w-100"></div>
                        <div className="col" id="game-canvas-container">
                            <Canvas dim={{height: 'auto', width: 'auto'}}  drawAllowed={this.state.drawer === this.state.username} lobby_code={this.state.lobby_code} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" id="game-chat-container">
                    <Chat ref={this.child} onRefreshGameState={this.refreshGameState} username={this.state.username} onCorrectGuess={this.requestStateRefresh} chatbox_disabled={this.state.drawer === this.state.username} correct_word={this.state.cur_word} />
                </div>
            </div>
        )
    }
}

export default function(props){
    const loc = useLocation();
    const nav = useNavigate();

    return(<MainGame {...props} location={loc} navigate={nav} />)
}