import React from 'react';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'

const {Sider} = Layout;

export default class SettingSider extends React.Component {
    constructor() {
        super();
        this.state = {
            web_url_power: null,//页面路由权限
            url_list: null,
        }
    }

    componentDidMount() {
        this.getMemberWebUrlPower();
    }

    setMenuItem() {
        const url = getConfig('request_get_web_url_list');
        LCAxios({
            url,
            type: "post",
            post_params: {},
            success: response => {
                if (response.data.code == 200) {
                    const url_list = [];
                    const web_url_power = this.state.web_url_power;
                    response.data.data.map(function (val, key, arr) {
                        if ((web_url_power & val.power_mark) && val.web_url == '/home/setting/tags') {
                            url_list.push(
                                <Menu.Item key="tags">
                                    <Link to={`/home/setting/tags`}>标签管理</Link>
                                </Menu.Item>
                            );
                        }
                        if ((web_url_power & val.power_mark) && val.web_url == '/home/setting/userManage') {
                            url_list.push(
                                <Menu.Item key="user">
                                    <Link to={`/home/setting/userManage`}>用户管理</Link>
                                </Menu.Item>
                            );
                        }
                        if ((web_url_power & val.power_mark) && val.web_url == '/home/setting/PowerGroup') {
                            url_list.push(
                                <Menu.Item key="PowerGroup">
                                    <Link to={`/home/setting/PowerGroup`}>权限组管理</Link>
                                </Menu.Item>
                            );
                        }
                        if ((web_url_power & val.power_mark) && val.web_url == '/home/setting/log') {
                            url_list.push(
                                <Menu.Item key="log">
                                    <Link to={`/home/setting/log`}>日志查看</Link>
                                </Menu.Item>
                            );
                        }
                        if ((web_url_power & val.power_mark) && val.web_url == '/home/setting/webUrl') {
                            url_list.push(
                                <Menu.Item key="webUrl">
                                    <Link to={`/home/setting/webUrl`}>前端路由权限管理</Link>
                                </Menu.Item>
                            );
                        }
                    });
                    this.setState({url_list})
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    getMemberWebUrlPower() {
        const url = getConfig('request_get_member_power');
        LCAxios({
            url,
            type: "post",
            post_params: {},
            success: response => {
                if (response.data.code == 200) {
                    this.setState({web_url_power: response.data.data.web_url_power}, this.setMenuItem);
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    render() {
        return (
            <Sider width={200} style={{background: '#fff'}}>
                <Menu
                    mode="inline"
                    selectedKeys={[this.props.type]}
                    style={{height: '100%'}}
                >
                    <Menu.Item key="userInfo">
                        <Link to={`/home/setting/userInfo`}>基础信息</Link>
                    </Menu.Item>
                    {this.state.url_list}
                </Menu>
            </Sider>
        )
    }
}