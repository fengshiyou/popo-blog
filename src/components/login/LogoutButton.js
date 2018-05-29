import React from 'react'

import {withRouter} from "react-router-dom";
class LogoutButton extends React.Component{
    constructor(){
        super();
        this.logout =() => {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            localStorage.removeItem("user_name");
            localStorage.removeItem("acount");
            location.reload();
            this.props.history.push('/home/blog/home');
        }
    }
    render(){
        return (
            <span className={this.props.className} onClick={this.logout}>
                登出
            </span>
        )
    }
}
export default withRouter(LogoutButton)