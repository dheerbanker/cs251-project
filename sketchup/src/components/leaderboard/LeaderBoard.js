import ScoreBoard from "../scoreboard/ScoreBoard";
import React,{Component} from "react";

import API from '../../utils/Endpoints';

import './LeaderBoard.css';

export default class LeaderBoard extends Component{
    constructor(props){
        super(props);

        this.state = {
            score_list: [],
        }
    }

    componentDidMount(){
        fetch(API.LEADERBOARD)
        .then((response) => response.json())
        .then((data)=>{
            if(Array.isArray(data)){
                this.setState({score_list: data});
            }
        })
        .catch((error) => {console.error(error);})
    }

    render(){
        return(
            <div id="final-score-container">
                <h1>Leaderboard</h1>
                <ScoreBoard score_list={this.state.score_list} title="" />
            </div>
        )
    }
}