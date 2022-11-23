import React, {Component} from "react";
import './ChatBubble.scss'

export default class ChatBubble extends Component {
    render() {
        return(
            <div className={`chat-wrapper ${this.props.bubbleType}`}>
                <div className="chat-content">
                    <p className={`message ${this.props.bubbleType}`}>
                    <b>{this.props.username}</b>
                    <br />
                    {this.props.message}
                    </p>
                </div>
            </div>
        )
    }
}