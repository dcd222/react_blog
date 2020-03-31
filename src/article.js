import React from 'react';
import './article.css';
import axios from 'axios';
// import {useParams} from "react-router-dom"
// 文章页面
class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            article:''
        }
    
    }
    // 获取数据
    componentDidMount(){
        axios.post(`/api/getarticle`,
        {
            id: this.props.match.params.id
        })
        .then(res => {
            this.setState({article:res.data.msg[0]});
        });
    }
    render(){
        return(
            <div className="container">123
                <header>
                    <h1>{this.state.article.title}</h1>
                    <span className="auther">作者：{this.state.article.auther}</span><span>时间：{this.state.article.date}</span>
                </header>
                <div  className="context" dangerouslySetInnerHTML={{__html: this.state.article.context}}></div>
            </div>
        )
    }
}
export default Article