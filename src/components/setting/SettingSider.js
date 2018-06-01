import React from 'react';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Sider} = Layout;
export default class SettingSider extends React.Component {
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
                    <Menu.Item key="tags">
                        <Link to={`/home/setting/tags`}>标签管理</Link>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Link to={`/home/setting/user`}>用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="authGroup">
                        <Link to={`/home/setting/authGroup`}>权限组管理</Link>
                    </Menu.Item>
                    <Menu.Item key="log">
                        <Link to={`/home/setting/log`}>日志查看</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}