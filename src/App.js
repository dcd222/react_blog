import React from 'react';
import './App.css';
import axios from 'axios';

function  clock(){
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    FONT_HEIGHT = 20,
    MARGIN = 35,
    // HAND_TRUNCATION = canvas.width/25,
    // HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;
    context.strokeStyle = "#dad9d9"
    context.fillStyle = "#dad9d9"

  function drawCircle(){
      context.beginPath();
      context.arc(canvas.width/2,canvas.height/2,
                  RADIUS,0,Math.PI*2,true)
      context.stroke();
  }

  function drawNumberals(){
      var numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
          angle = 0,
          numeralWidth = 0;
      
      numerals.forEach(function(numeral){
          angle = Math.PI/6 * (numeral-3);
          numeralWidth = context.measureText(numeral).width;
          context.fillText(numeral,
              canvas.width/2 + Math.cos(angle)*(HAND_RADIUS)-numeralWidth/2,
              canvas.height/2 + Math.sin(angle)*(HAND_RADIUS)+FONT_HEIGHT/3,
              )
      })
  }

  function drawCenter(){
      context.beginPath();
      context.arc(canvas.width/2,canvas.height/2,5,0,Math.PI*2,true);
      context.fill();
  }

  function drawHand(loc ,handlength,lineWidth){
      var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
          handRadius = RADIUS * handlength
          // handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;
      
      context.moveTo(canvas.width/2,canvas.height/2);
      context.lineWidth = lineWidth;
      context.lineTo(canvas.width/2 + Math.cos(angle) * handRadius,
                      canvas.height/2 + Math.sin(angle) * handRadius);
      context.stroke();
      context.lineWidth = 1;
      
  }


  function drawHands(){
      var date = new Date(),
          hour = date.getHours();
      
      hour = hour > 12 ? hour -12 : hour;

      drawHand(hour*5 + (date.getMinutes()/60)*5,0.5,5)
      drawHand(date.getMinutes(),0.7,3);
      drawHand(date.getSeconds(),0.9,2);
  }

  function drawClock(){
      context.clearRect(0,0,canvas.width,canvas.height);

      drawCircle();
      drawCenter();
      drawHands();
      drawNumberals();
  }

  context.font = FONT_HEIGHT + 'px Arical';
  var loop = setInterval(drawClock, 1000);

}
function ArticleList (props){
  console.log(props)
  const items = props.items;
  const listItems = items.map((item) => 
      <li key={item.id}>
        <h2>{item.title}</h2>
        <p className="context">{item.abstract}</p>
        <div className="date">{item.date}&nbsp;&nbsp;{item.auther}</div>
      </li>
    
  )
  return(
    <ul>
      {listItems}
    </ul>
  );
}
// const num = [123,4,124,2]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    axios.post(`/api/getarticle`)
      .then(res => {
        console.log(res)
        this.setState({data:res.data.msg});

    });
    clock();
  }
  render(){
    return (
      <div className="home">
        <div className="title">WELCOME TO CODINGMAN SPACE</div>
        <canvas id="canvas" width="500" height="500"/>
        <section className="article container">
          <ArticleList items={this.state.data} />
        </section>
      </div>
    );
  }
}

export default App;
