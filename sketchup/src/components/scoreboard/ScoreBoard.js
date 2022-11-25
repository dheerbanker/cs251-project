import React, {Component} from "react";

import './ScoreBoard.css'

export default class ScoreBoard extends Component {
    constructor(props){
        super(props);

        //TODO: initialise state here based on all the usernames present in some variable in props

        this.state = {
            score_list: [
                {username: 'sherlock', score: 200},
                {username: 'moriarty', score: 100},
                {username: 'watson', score: 50},
                {username: 'mycroft', score: 25},
            ]
        }
    }

    render(){
        if(!Array.isArray(this.state.score_list)) return("");
        let score_list_sorted = this.state.score_list;
        score_list_sorted.sort(function(a,b){if(a.score > b.score) return -1; else return 1;});
        return(
            <div id="scoreboard-container">
                <h1>Scoreboard</h1>
                {
                    score_list_sorted.map((score_record, index) => (
                        <div className="score-record" key={index}>
                            <div className="row">
                                <div className="col rank-indicator automargin nopad">
                                    #{index+1}
                                </div>

                                <div className="w-100"></div>

                                <div className="col scoreboard-username nopad">
                                    <b>{score_record.username}</b>
                                    <br/>
                                    <span>Score: {score_record.score}</span>
                                </div>
                            </div>
                        </div>
                    ))
                } 
                {score_list_sorted.length === 0 && <p>Waiting for players to join ...</p>}
            </div>
        )
    }
}