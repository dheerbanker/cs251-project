import React, {Component} from "react";

import './ScoreBoard.css'

export default class ScoreBoard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(!Array.isArray(this.props.score_list)) return("");
        let score_list_sorted = this.props.score_list;
        score_list_sorted.sort(function(a,b){if(a.score > b.score) return -1; else return 1;});
        return(
            <div id="scoreboard-container">
                <h1>{this.props.title === undefined ? "Scoreboard" : this.props.title}</h1>
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
                {score_list_sorted.length === 0 && <p>No players yet...</p>}
            </div>
        )
    }
}