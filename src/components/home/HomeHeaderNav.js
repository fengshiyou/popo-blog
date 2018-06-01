import React from 'react'
import {Link} from "react-router-dom"
import {Button} from 'antd'
import NeadLoginButton from "../login/NeadLoginButton"
import LogoutButton from '../login/LogoutButton'
import HomeHeaderNavButton from './HomeHeaderNavButton'

export default class HomeHeaderNav extends React.Component {
    render() {
        let home_header_nav = '';
        const to_uid = this.props.to_uid;
        if(to_uid=='home' && !localStorage.getItem('uid')){//未登录
            home_header_nav = (
                <div>
                    <Link to={`/home/blog/home`} className={`home-header-nav-item text-center ${this.props.path_name =="/home/blog/home"? 'home-header-nav-item-active':''}`}>博客大厅</Link>
                    <Link to="/" className="home-header-nav-item text-center">关于</Link>
                    <NeadLoginButton className={`home-header-nav-item text-center ${this.props.path_name == "/home/blog/myblog" ? 'home-header-nav-item-active' : ''}`} component={HomeHeaderNavButton} context="我的博客" link_to={`/home/blog/myblog`}/>
                </div>
            );
        }else if(to_uid=='home' && localStorage.getItem('uid')){//已登陆 在自己的主页
            home_header_nav = (
                <div>
                    <Link to={`/${this.props.to_uid}/`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/` ? 'home-header-nav-item-active' : ''}`}>个人主页</Link>
                    <Link to={`/${this.props.to_uid}/blog/home`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/blog/home` ? 'home-header-nav-item-active' : ''}`}>博客大厅</Link>
                    <Link to="/" className="home-header-nav-item text-center">关于</Link>
                    <Link to={`/${this.props.to_uid}/comment`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/comment` ? 'home-header-nav-item-active' : ''}`}>留言版</Link>
                    <NeadLoginButton className={`home-header-nav-item text-center ${this.props.path_name == `/home/blog/myblog` ? 'home-header-nav-item-active' : ''}`} component={HomeHeaderNavButton} context="我的博客" link_to={`/home/blog/myblog`}/>
                    <Link to={`/home/setting/userInfo`} className={`home-header-nav-item text-center ${this.props.path_name.indexOf('/home/setting/') == 0 ? 'home-header-nav-item-active' : ''}`}>个人设置</Link>
                    <LogoutButton className="home-header-nav-item text-center"/>
                </div>
            );
        }else{//别人的主页
            home_header_nav = (
                <div>
                    <Link to={`/${this.props.to_uid}/`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/` ? 'home-header-nav-item-active' : ''}`}>{this.props.to_acount}的主页</Link>
                    <Link to={`/${this.props.to_uid}/blog/${this.props.to_uid}`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/blog/${this.props.to_uid}` ? 'home-header-nav-item-active' : ''}`}>{this.props.to_acount}的博客</Link>
                    <Link to={`/${this.props.to_uid}/comment`} className={`home-header-nav-item text-center ${this.props.path_name == `/${this.props.to_uid}/comment` ? 'home-header-nav-item-active' : ''}`}>{this.props.to_acount}的留言版</Link>
                    <NeadLoginButton className="home-header-nav-item text-center" component={HomeHeaderNavButton} context="我的博客" link_to={`/home/blog/myblog`}/>
                    <LogoutButton className="home-header-nav-item text-center"/>
                </div>
            );
        }
        return (
            <div className="home-header-nav">
                {home_header_nav}
            </div>
        )
    }
}