import React, {Component} from "react";

import './SpecialBubble.css'

export default class SpecialBubble extends Component{
    constructor(props){
        super(props);

        this.foreground = undefined;
        this.updateForegroundColor();
    }

    updateForegroundColor(){
        var rgb = this.hexToRgb(this.props.bubble_shade);
        if(rgb === null) return;

        const brightness = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000);
        this.foreground = (brightness > 125 ? 'black' : 'white');
    }
    
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    render(){
        return(
            <div className="special-bubble-container" style={{"background": this.props.bubble_shade, "color": this.foreground}}>
                {this.props.message}
            </div>
        );     
    }
}