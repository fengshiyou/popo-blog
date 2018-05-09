import React from 'react'
import {Link} from "react-router-dom"
import {Button} from 'antd'
import NeadLoginButton from "../login/NeadLoginButton"
import LogoutButton from '../login/LogoutButton'
import HomeHeaderNavButton from './HomeHeaderNavButton'

export default class HomeHeaderNav extends React.Component {
    render() {
        return (
            <div className="home-header-nav">
                <Link to="/" className="home-header-nav-item text-center">主页</Link>
                <Link to="/blog" className="home-header-nav-item text-center">博客大厅</Link>
                <Link to="/" className="home-header-nav-item text-center">关于</Link>
                <Link to="/" className="home-header-nav-item text-center">留言</Link>
                <NeadLoginButton className="home-header-nav-item text-center" component={HomeHeaderNavButton} context="我的博客" link_to="/myblog"/>
                <LogoutButton className="home-header-nav-item text-center"/>
            </div>
        )
    }
}