/**
 * 所有的设置页面需要的对话框
 */
import React from 'react'
import {Modal, Input} from 'antd'
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'

export default class SettingDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            dialog_info: null,
            new_power_role_name: null,
            new_power_url_name: null,
            new_power_url: null,
            login:null,
        };
        //对话框关闭
        this.close = () => this._close();
        //确认
        this.ok = () => this._ok();
        //对话框完全关闭之后
        this.afterClose = () => this._afterClose()
    }

    componentDidMount() {
        //根据type  设置 model 中info里面的内容
        this.setState({visible: this.props.visible});
    }

    _close() {
        this.setState({
            visible: false
        });
    }

    _ok() {
        let url = '';
        switch (this.props.type) {
            //新增权限组
            case "add_power_role":
                url = getConfig('request_add_power_role');
                LCAxios({
                    url,
                    type: "POST",
                    post_params: {name: this.state.new_power_role_name},
                    success: response => {
                        if (response.data.code == 200) {
                            const data = response.data.data;
                            alert("新增权限组成功");
                            this.props.ok();
                            this.setState({visible: false});
                        } else {
                            alert(response.data.msg)
                        }
                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
            //新增权限路由
            case "add_power_url":
                url = getConfig('request_add_power_url');
                LCAxios({
                    url,
                    type: "POST",
                    post_params: {name: this.state.new_power_url_name,url:this.state.new_power_url},
                    success: response => {
                        if (response.data.code == 200) {
                            const data = response.data.data;
                            alert("新增权限路由成功");
                            this.props.ok();
                            this.setState({visible: false});
                        } else {
                            alert(response.data.msg)
                        }
                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
            case "del_power_role":
                url = getConfig('request_del_power_role');
                LCAxios({
                    url,
                    type: "POST",
                    post_params: {id: this.props.info.id},
                    success: response => {
                        if (response.data.code == 200) {
                            alert("删除成功");
                            this.props.ok();
                            this.setState({visible: false});
                        } else {
                            alert(response.data.msg)
                        }
                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
            case "del_power_url":
                url = getConfig('request_del_power_url');
                LCAxios({
                    url,
                    type: "POST",
                    post_params: {id: this.props.info.id},
                    success: response => {
                        if (response.data.code == 200) {
                            alert("删除成功");
                            this.props.ok();
                            this.setState({visible: false});
                        } else {
                            alert(response.data.msg)
                        }
                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
        }
    }

    componentWillUnmount() {
        console.log("销毁了 setting dialog")
    }

    _afterClose() {
        this.props.afterClose();
    }

    render() {
        let dialog_info = null;
        let title = null;
        //组装dialog中的内容
        switch (this.props.type) {
            //新增权限路由
            case "add_power_role":
                title = "新增权限组";
                dialog_info = (
                    <Input placeholder="请输入权限组名称" onChange={(e) => {
                        this.setState({new_power_role_name: e.target.value})
                    }}/>
                );
                break;
            //新增权限路由
            case "add_power_url":
                title = "新增权限路由";
                dialog_info = (
                    <div>
                        <Input placeholder="请输入路由名称" onChange={(e) => {
                            this.setState({new_power_url_name: e.target.value})
                        }}/>
                        <Input placeholder="请输入路由" onChange={(e) => {
                            this.setState({new_power_url: e.target.value})
                        }}/>
                    </div>
                );
                break;
            //删除权限组
            case "del_power_role":
                title = "确定要删除“" + this.props.info.name + "”权限组吗？";
                break;
            //删除权限路由
            case "del_power_url":
                title = "确定要删除“" + this.props.info.name + "(" + this.props.info.url +  ")" + "”权限路由吗？";
                break;
        }
        return (
            <div>
                <Modal
                    title={title}
                    visible={this.state.visible}
                    afterClose={this.afterClose}
                    onCancel={this.close}
                    closable={true}
                    onOk={this.ok}
                >
                    {dialog_info}
                </Modal>
                {this.state.login}
            </div>
        )
    }
}