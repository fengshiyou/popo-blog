import React from 'react'
import LCAxios from '../../until/LoginCheckAxios'
import {Table, Button, Checkbox,Select} from 'antd'
import {getConfig} from '../../until/Tool'

export default class SettingUserManage extends React.Component {
    constructor() {
        super();
        this.state = {
            login: null,
            data: [],
            pagination: {},
            page_no: 1,
            power_select_option:[],
        };
        //获取用户列表
        this.getList = () => this._getList();
        //设置页数
        this.setPage = (pagination) => this._setPage(pagination)
        //重置密码
        this.resetPasswd = (uid) => this._resetPasswd(uid)
        //设置启用禁用
        this.setEnabled = (checked,member_info) => this._setEnabled(checked,member_info)
        //获取权限角色列表  下拉选择框内容
        this.getPowerList = ()=>this._getPowerList();
        //设置角色权限
        this.setPowerRole = (power_role,member_info)=>this._setPowerRole(power_role,member_info);
    }

    componentDidMount() {
        this.getList();
        this.getPowerList();
    }

    _setPage(pagination) {
        this.setState({page_no: pagination.current}, this.getList);
    }

    _getList() {
        const url = getConfig('request_get_user_list');
        LCAxios({
            url,
            type: "POST",
            post_params: {page_no: this.state.page_no},
            success: response => {
                if (response.data.code == 200) {
                    const list = response.data.data.list;
                    const total = response.data.data.total;
                    let data = [];
                    const _this = this;
                    //组装table插件所需要的数据
                    list.map(function (val, key, arr) {
                        const obj = {
                            key,
                            uid: val.uid,
                            acount: val.acount,
                            created_at: val.created_at,
                            enabled: val.enabled,
                            updated_at: val.updated_at,
                            power_role_id:val.power_role_id,
                        };
                        data.push(obj)
                    });
                    //设置页数
                    const pagination = {...this.state.pagination};
                    pagination.total = total;
                    this.setState({
                        data,
                        pagination
                    })
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    _getPowerList(){
        const url = getConfig('request_get_power_list');
        LCAxios({
            url,
            type: "get",
            post_params: {},
            success: response => {
                if(response.data.code == 200){
                    //组装权限选择框
                    const Option = Select.Option;
                    const power_role = response.data.data.power_role;
                    let power_select_option = [];
                    //没有权限的选项
                    power_select_option.push(
                        <Option key={0} value={0}>普通</Option>
                    )
                    power_role.map(function (val,key,arr) {
                        power_select_option.push(
                            <Option key={key} value={val.id}>{val.name}</Option>
                        )
                    });
                    this.setState({power_select_option})
                }else{
                    elert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    _resetPasswd(uid) {
        const url = getConfig('request_reset_user_passwd');
        LCAxios({
            url,
            type: "POST",
            post_params: {uid},
            success: response => {
                if (response.data.code == 200) {
                    alert("重置成功，密码为:123456")
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    _setEnabled(checked,member_info){
        const url = getConfig('request_set_user_enabled');
        LCAxios({
            url,
            type: "POST",
            post_params: {uid:member_info.uid,enabled:checked},
            success: response => {
                if (response.data.code == 200) {
                    alert("设置成功")
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    _setPowerRole(power_role,member_info){
        const url = getConfig('request_set_user_power_role');
        LCAxios({
            url,
            type: "POST",
            post_params: {uid:member_info.uid,power_role_id:power_role},
            success: response => {
                if (response.data.code == 200) {
                    alert("设置成功")
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
        const columns = [
            {
                title: '账号',
                dataIndex: 'acount',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
            },
            {
                title: '更新时间',
                dataIndex: 'updated_at',
                key: 'updated_at',
            },
            {
                title: '启用',
                key: 'address',
                render: (text, record, index) => {
                    //checked 启用是选中
                    const checked = record.enabled == 0 ? false : true;
                    return (
                        <Checkbox
                            onChange={(e) => this.setEnabled(e.target.checked,record)}
                            defaultChecked={checked}
                        />
                    );
                }
            },
            {
                title: '用户组',
                key: 'user_group',
                render: (text, record, index) => {
                    //checked 如果行数据权限包含权限路由权限， 则选中
                    const checked = record.enabled == 0 ? false : true;
                    return (
                        <Select onChange={(power_role)=>this.setPowerRole(power_role,record)} defaultValue={parseInt(record.power_role_id)} style={{ width: 120 }}>
                            {this.state.power_select_option}
                        </Select>
                    );
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button type="danger" size="small" onClick={() => this.resetPasswd(record.uid)}>重置密码</Button>
                        </div>
                    );
                }
            }
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    onChange={(pagination) => this.setPage(pagination)}
                />
                {this.state.login}
            </div>
        )
    }
}