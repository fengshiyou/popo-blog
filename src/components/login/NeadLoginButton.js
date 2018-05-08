import React from 'react'
import Login from '../login/Login'
import {withRouter} from "react-router-dom";

function NeadLoginButtonWrapped({component: Component, ...args}) {
    class NeadLoginButton extends React.Component {
        constructor() {
            super();
            this.state = {showLogin: false}
            this.linkTo = () => this._linkTo()
            this.showlogin = () => this._showLogin()
            this.modal_close = () => this._modal_close();

        }

        _modal_close() {
            this.setState({showLogin: false})
        }

        _linkTo() {
            if(args.link_to){
                this.props.history.push(args.link_to);
            }
        }

        _showLogin() {
            this.setState({showLogin: true})
        }

        render() {
            if (localStorage.getItem("token")) {
                return (
                    <Component {...args} onClick={this.linkTo}> {args.context}</Component>
                )
            } else {
                let login = '';
                if (this.state.showLogin) {
                    login = <Login visible={this.state.showLogin} close={this.modal_close} login_redirect={args.link_to}/>
                }
                return (
                    <Component {...args} onClick={this.showlogin}> {args.context}{login}</Component>
                )
            }

        }
    }

    return withRouter(NeadLoginButton)
}

export default ({component: Component, ...args}) => {
    const NeadLoginButton = NeadLoginButtonWrapped({component: Component, ...args})
    return (
        <NeadLoginButton/>
    )
}