import React from 'react'
import {Link} from "react-router-dom"

export default class HomeHeaderNav extends React.Component {
    render() {
        return (
            <div className="home-header-nav">
                <Link to="/" className="home-header-nav-item text-center">主页</Link>
                <Link to="/blog" className="home-header-nav-item text-center">博客大厅</Link>
                <Link to="/" className="home-header-nav-item text-center">关于</Link>
                <Link to="/" className="home-header-nav-item text-center">留言</Link>
            </div>
        )
    }
}