import React from 'react'
export default class LogoutButton extends React.Component{
    constructor(){
        super();
        this.logout =() => {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            localStorage.removeItem("user_name");
            location.reload();
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