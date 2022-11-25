import ScoreBoard from "../scoreboard/ScoreBoard";
import React,{Component} from "react";

import { useLocation } from "react-router-dom";

import './FinalScore.css';

class FinalScore extends Component{
    constructor(props){
        super(props);

        var def_sc = [];
        if(this.props.score_list !== undefined) def_sc = this.props.score_list;
        else if(this.props.state.score_list !== undefined) def_sc = this.props.score_list;

        this.state = {
            score_list: def_sc
        }
    }

    render(){
        return(
            <div id="final-score-container">
                <h1>Final Scores</h1>
                <ScoreBoard score_list={this.state.score_list} title="" />
            </div>
        )
    }
}

export default function(props){
    const loc = useLocation();
    return(<FinalScore {...props} location={loc} />)
}