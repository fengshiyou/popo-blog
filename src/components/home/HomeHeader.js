import React from 'react'
import HomeHeaderNav from './HomeHeaderNav'
import "../../css/home/HomeHeader.css"

export default class HomeHeader extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="home-header black-back">
                <div className="home-header-title">
                    <a>欢迎来到popo的博客</a>
                </div>
                <div className="home-header-subtitle">
                    <a>少整些没用的</a>
                </div>
                <HomeHeaderNav/>
            </div>
        )
    }
}