import React from 'react'
import "../../css/home/HomeMyDetail.css"

export default class HomeMyDetail extends React.Component {
    render(){
        return(
            <div className="my-detail text-center">
                <img className="my-head" src="/src/img/my_head.jpg"/>
                <h1>破破</h1>
                <p>Never Say Never</p>
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com">Github</a>
                </div>
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href="">在线简历</a>
                </div>
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href="">个人收藏</a>
                </div>
            </div>
        )
    }
}