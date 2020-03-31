import React from 'react';
import './app.css';
import axios from 'axios';
import {clock} from './components/clock.js';
import {NavLink} from "react-router-dom";

// 首页
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      msg:[]
    };
  }
  // 文章列表
  articleList (props){
    const listItems = props.map((item) => 
      <NavLink to={ '/article/' + item.id } key={item.id}>
        <li >
          <h2>{item.title}</h2>
          <p className="context">{item.abstract}</p>
          <div className="date">{item.date}&nbsp;&nbsp;{item.auther}</div>
        </li>
      </NavLink>
    )
    return(
      <ul>
        {listItems}
      </ul>
    );
  }
  // 留言板
  messagrBord (props){
    return (
      <dl>
        <dt>留言板</dt>
          {
            props.map((item,i)=>{
              return (
                  <dd key={item.id}>
                    {item.user}:{item.context}
                  </dd>
              )
            })
          }
        
        <dd>
          <textarea></textarea>
          <div className="launch" >评论</div>
        </dd>
      </dl>
    )
  }
  componentDidMount() {
    axios.post(`/api/getarticle`)
      .then(res => {
        this.setState({data:res.data.msg.reverse()});
    });
    axios.get(`/api/getcontext`)
      .then(res => {
        this.setState({msg:res.data.msg});
        
    });
    clock();
  }
  render(){
    return (
      <div className="home">
        <div className="title">WELCOME TO CODINGMAN SPACE</div>
        <canvas id="canvas" width="500" height="500"/>
        {this.messagrBord(this.state.msg)}
        <section className="article container">
          {this.articleList(this.state.data)}
        </section>
      </div>
    );
  }
}

export default App;
