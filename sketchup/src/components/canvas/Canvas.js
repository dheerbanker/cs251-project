import React from "react";
const socket_url = "ws://127.0.0.1:8000"

// const noop = () => {}

export default class Canvas extends React.Component{
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    

    this.state = (
      {
        isDrawing : false
      }
    )

    this.lobby_code = "room";
    if(this.props.lobby_code !== undefined) this.lobby_code = this.props.lobby_code;
  }
  
  componentDidMount(){
    // server_socket = new WebSocket(socket_url + "/draw/room/")
    this.server_socket = new WebSocket(socket_url + `/draw/${this.lobby_code}`);


    this.canvasRef.current.style.width = "100%"
    this.canvasRef.current.style.height = "100%"
    this.canvasRef.current.height = this.canvasRef.current.offsetHeight
    this.canvasRef.current.width = this.canvasRef.current.offsetWidth

    this.loadCanvasContext();
    this.context.lineCap = "round";
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
    this.context2.lineCap = "round";
    this.context2.strokeStyle = "black";
    this.context2.lineWidth = 1;
    this.server_socket.onmessage = this.drawAllowed ? (event)=>{} : (event) => {console.log(event);var point_data = JSON.parse(event.data);this.showPoints(point_data.point.x, point_data.point.y,point_data.newLine);}
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.drawAllowed !== this.props.drawAllowed){
      this.loadCanvasContext();
      this.context.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    }
    this.server_socket.onmessage = this.drawAllowed ? (event)=>{} : (event) => {var point_data = JSON.parse(event.data);this.showPoints(point_data.point.x, point_data.point.y,point_data.newLine);}
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
    const msg = {
      point : {
        x : offsetX,
        y : offsetY 
      },
      newLine: true
    }
    // console.log(msg)
    this.server_socket.send(JSON.stringify(msg))

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
      },
      newLine: false 
    }
    // console.log(msg)
    this.server_socket.send(JSON.stringify(msg))
    // this.server_socket.onopen = (event) => {
    // }
  };

  showPoints = (x,y,newLine) => {
    if(newLine){
      this.context2.beginPath();
      this.context2.moveTo(x,y);
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
        <div style={{
          "width" : "100%",
          "height" : "100%",
          "position" : "relative"
        }
        }>

        <canvas
        // width={this.props.dim.width}
        // height={this.props.dim.height}
        onMouseDown={this.startDrawing}
        onMouseUp={this.finishDrawing}
        onMouseMove={this.draw}
        style={{border: "1px solid"}}
        ref={this.canvasRef} />
        </div>
      )
    }

    else{
      return(
        <div style={{
          "width" : "100%",
          "height" : "100%",
          "position" : "relative"
        }
        }>
        <canvas
        // width={this.props.dim.width}
        // height={this.props.dim.height}
        style={{border: "1px solid"}}
        ref={this.canvasRef} />
        </div>
      )
    }

    
  } 

  loadCanvasContext = () => {

    if(this.context === undefined || Object.keys(this.context).length === 0)
      this.context = this.canvasRef.current.getContext("2d");

      //testing
    if(this.context2 === undefined || Object.keys(this.context2).length === 0)
      this.context2 = this.canvasRef.current.getContext("2d");
  }

}