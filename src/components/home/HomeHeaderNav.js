import React from 'react'
import {Link} from "react-router-dom"
import LoginButton from "../login/LoginButton"
import LogoutButton from '../login/LogoutButton'

export default class HomeHeaderNav extends React.Component {
    render() {
        return (
            <div className="home-header-nav">
                <Link to="/" className="home-header-nav-item text-center">主页</Link>
                <Link to="/blog" className="home-header-nav-item text-center">博客大厅</Link>
                <Link to="/" className="home-header-nav-item text-center">关于</Link>
                <Link to="/" className="home-header-nav-item text-center">留言</Link>
                <LoginButton login_to={"/myblog"} className="home-header-nav-item text-center" button_text="我的博客" is_login_text="我的博客"/>
                <LogoutButton className="home-header-nav-item text-center"/>
                <Link to='/test2' className="home-header-nav-item text-center">test2</Link>
                <Link to='/test3' className="home-header-nav-item text-center">登陆验证</Link>
                <Link to="/editor" className="home-header-nav-item text-center">临时编译器</Link>
            </div>
        )
    }
}