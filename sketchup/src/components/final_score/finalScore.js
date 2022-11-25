import ScoreBoard from "../scoreboard/ScoreBoard";
import React,{Component} from "react";

export default class FinalScore extends Component{
    constructor(props){
        super(props);
    }

    render(){
        <ScoreBoard score_list={this.props.score_list} />
    }
}