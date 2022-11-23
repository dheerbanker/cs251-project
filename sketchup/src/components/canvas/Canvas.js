import React from "react";
const server_url = "ws://127.0.0.1:8000"

// const noop = () => {}

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
    server_socket = new WebSocket(server_url + "/draw/room/")

  componentDidMount(){
    this.loadCanvasContext();
    this.context.lineCap = "round";
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
    this.context2.lineCap = "round";
    this.context2.strokeStyle = "black";
    this.context2.lineWidth = 1;
    this.server_socket.onopen = () => {
      console.log("socket connected")
    }
    this.server_socket.onmessage = (event) => {
      console.log(event)
      this.showPoints(JSON.parse(event.data).point.x, JSON.parse(event.data).point.y)
    }
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

    const msg = {
      point : {
        x : offsetX,
        y : offsetY
      }
    }
    console.log(msg)
    this.server_socket.send(JSON.stringify(msg))
    // this.server_socket.onopen = (event) => {
    // }
  };

  showPoints = (x,y) => {
    if(!this.state.broadcastStarted){
      this.context2.moveTo(x,y);
      this.setState({
        broadcastStarted : true 
      })
      return
    }

    this.context2.lineTo(x,y);
    this.context2.stroke();
  };

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

      //testing
    if(this.context2 === undefined || Object.keys(this.context2).length === 0)
      this.context2 = this.canvasRef.current.getContext("2d");
  }

}