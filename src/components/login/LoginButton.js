import React from 'react'
import Login from './Login'
import {Link} from 'react-router-dom'

export default class LoginButton extends React.Component {
    //@todo 有空封装成高阶组件
    constructor() {
        super();
        this.state = {visible: false};
        this.login = () => this._login();
        this.modal_close = () => this._modal_close();
    }

    _login() {
        this.setState({visible: true});
    }

    _modal_close() {
        this.setState({visible: false})
    }

    render() {
        if (localStorage.getItem("token")) {
            return (
                <Link to={this.props.login_to} className="home-header-nav-item text-center">
                    {this.props.is_login_text}
                </Link>
            )
        } else {
            let login = '';
            if (this.state.visible) {
                login = <Login visible={this.state.visible} close={this.modal_close} login_redirect={this.props.login_to}/>
            }
            return (
                <div className={this.props.className} onClick={this.login}>
                    <span>{this.props.button_text}</span>
                    {login}
                </div>
            )
        }
    }
}