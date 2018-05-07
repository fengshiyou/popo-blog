import React from 'react'
import {Button, Modal, Input, Tabs} from 'antd'
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            mask_closable: true,//是否可点击蒙板关闭对话框
            acount:null,//账号
            passwd:null,//密码
            passwd_check:null,//密码确认
            error_msg:null,//错误信息
            type:1 //类型 1登陆 2注册
        }
        this.showModal = () => this._showModal()
        //确认
        this.handleOk = (e) => this._handleOk(e)
        //取消
        this.handleCancel = (e) => this._handleCancel(e)
        //关闭对话框
        this.close = () => this._close()
        //设置账号
        this.setAcount = (e)=> this._setAcount(e)
        //设置密码
        this.setPasswd = (e)=> this._setPasswd(e)
        //设置确认密码
        this.setPasswdCheck = (e) => this._setPasswdCheck(e)
        //设置类型  1登陆  2注册
        this.setType = (value) => this._setType(value)
    }
    _setType(value){
        this.setState({type:value});
        this.setState({error_msg:null});
    }
    _setPasswdCheck(e){
        this.setState({passwd_check:e.target.value});
        this.setState({error_msg:null});
    }
    _setAcount(e){
        this.setState({acount:e.target.value});
        this.setState({error_msg:null});
    }
    _setPasswd(e){
        this.setState({passwd:e.target.value});
        this.setState({error_msg:null});
    }
    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            mask_closable: this.props.mask_closable
        });
    }
    componentWillUnmount(){
        console.log("销毁了 登陆")
    }
    _close(){
        if (this.props.close) {
            this.props.close()
        }
    }

    _showModal() {
        this.setState({
            visible: true,
        });
    }

    _handleOk(e) {
        //检查表单元素
        if(!this.checkParams()){
            return ;
        }
        //登陆参数
        let params = {
            acount:this.state.acount,
            passwd:this.state.passwd
        };
        //登陆url
        let url = getConfig('request_login');
        //注册参数
        if(this.state.type == 2){
            params.passwd_check = this.state.passwd_check;
            //注册url
            url = getConfig('request_register');
        }
        //登陆请求
        axios.post(
            url,
            params
            ).then(
            response=>{
                if(response.data.code != 200){
                    this.setState({error_msg:response.data.msg});

                }else{
                    //登陆成功后的回调
                    if(this.props.login_call_back){
                        this.props.login_call_back();
                    }
                    //设置localStorage
                    localStorage.setItem('uid',response.data.data.uid);
                    localStorage.setItem('token',response.data.data.token);
                    this.setState({
                        visible: false,
                    });
                }
            }
        ).catch();
    }

    _handleCancel(e) {
        this.setState({
            visible: false,
        });
    }
    checkParams(){
        if(this.state.acount.length <= 2 || this.state.acount.length >= 30){
            this.setState({error_msg:"账号必须在2到30个字符之间"});
            return false;
        }else if(this.state.passwd.length <= 6 || this.state.passwd.length >= 18){
            this.setState({error_msg:"密码必须在6~18个字符之间"})
            return false;
        }else if(this.state.type == 2 && this.state.passwd != this.state.passwd_check){
            this.setState({error_msg:"两次密码输入不同，请检查"})
            return false;
        }
        return true;
    }

    render() {
        const TabPane = Tabs.TabPane;
        const footer = [];
        //是否允许取消
        if (this.state.mask_closable) {
            footer.push(<Button key="back" onClick={this.handleCancel}>取消</Button>)
        }
        footer.push(<Button key="submit" type="primary" onClick={this.handleOk}>确认</Button>)
        return (
            <div>
                <Modal
                    maskClosable={this.state.mask_closable}
                    closable={false}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={footer}
                    afterClose={this.close}
                >
                    <Tabs defaultActiveKey="1" onChange={this.setType}>
                        <TabPane tab="登陆" key="1">
                            <Input addonBefore="账号：" placeholder="请输入账号" onChange={this.setAcount} value={this.state.acount}/>
                            <Input addonBefore="密码：" type="password" placeholder="请输入密码" onChange={this.setPasswd} value={this.state.passwd}/>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Input addonBefore="账号：" placeholder="请输入账号" onChange={this.setAcount} value={this.state.acount}/>
                            <Input addonBefore="密码：" type="password" placeholder="请输入密码" onChange={this.setPasswd} value={this.state.passwd}/>
                            <Input addonBefore="密码：" type="password" placeholder="请确认密码" onChange={this.setPasswdCheck} value={this.state.passwd_check}/>
                        </TabPane>
                    </Tabs>
                    <span style={{color:"red"}}>{this.state.error_msg}</span>
                </Modal>
            </div>
        );
    }
}