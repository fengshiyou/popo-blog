import React from 'react'
import Login from './Login'

export default class LoginButton extends React.Component {
    constructor() {
        super();
        this.state = {visible: false};
        this.login = ()=> this._login();
        this.modal_close =() => this._modal_close();
    }
    _login(){
        this.setState({visible:true});
    }
    _modal_close(){
        this.setState({visible:false})
    }
    render() {
        if(localStorage.getItem("token") == 1){
            return (
                <div>
                    <span className={this.props.className}>已登陆</span>
                </div>
            )
        }else{
            let login ='';
            if(this.state.visible){
                login = <Login visible={this.state.visible} close={this.modal_close}/>
            }else{
                login = '';
            }
            return (
                <div className={this.props.className}  onClick={this.login}>
                    <span>登陆</span>
                    {login}
                </div>
            )
        }
    }
}