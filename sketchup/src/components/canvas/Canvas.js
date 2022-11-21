import React from "react";


export default class Canvas extends React.Component{
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    

    this.state = (
      {
        broadcastStarted: false,
        isDrawing : false
      }
    )

  }

  componentDidMount(){

    this.loadCanvasContext();
    this.context.lineCap = "round";
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
  }
  setIsDrawing(a){
    this.setState({
      isDrawing : a
    })
  }

  startDrawing = (nativeEvent) => {
    this.loadCanvasContext();
    var { offsetX, offsetY } = nativeEvent;
    this.context.beginPath();
    this.context.moveTo(offsetX, offsetY);
    this.setIsDrawing(true);
  }

  draw = ({ nativeEvent }) => {
    if (!this.state.isDrawing) {
      return;
    }
    this.loadCanvasContext();
    var { offsetX, offsetY } = nativeEvent;
    this.context.lineTo(offsetX, offsetY);
    this.context.stroke();
  }

  drawPoints = (x,y) => {
    if(!this.props.drawAllowed){
      return
    }

    if(!this.state.broadcastStarted){
      this.setState({
        broadcastStarted : true
      })
      this.context.moveTo(x,y);
    }

    else{
      this.context.lineTo(x,y);
      this.context.stroke();
    }
  }


  finishDrawing = () => {
    this.setIsDrawing(false);
  };


  render(){
    if(this.props.drawAllowed){
      return(
        <canvas
        width={this.props.dim.width}
        height={this.props.dim.height}
        onMouseDown={this.startDrawing}
        onMouseUp={this.finishDrawing}
        onMouseMove={this.draw}
        style={{border: "1px solid"}}
        ref={this.canvasRef} />
      )
    }

    else{
      return(
        <canvas
        width={this.props.dim.width}
        height={this.props.dim.height}
        style={{border: "1px solid"}}
        ref={this.canvasRef} />
      )
    }

    
  } 

  loadCanvasContext = () => {
    // console.log(this.canvasRef)  

    if(this.context === undefined || Object.keys(this.context).length === 0)
      this.context = this.canvasRef.current.getContext("2d");
  }

}