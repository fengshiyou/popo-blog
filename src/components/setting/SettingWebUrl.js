import React from 'react'
import {Table, Checkbox, Tooltip} from 'antd'
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'

export default class SettingWebUrl extends React.Component {
    constructor() {
        super();
        this.state = {
            login: null,
            data: null,
        };
        //获取权限用户
        this.getPowerList = () => this._getPowerList();
        //获取前端路由
        this.getWebUrlList = () => this._getWebUrlList();
        //设置权限
        this.setPower = (checked, info, power_mark) => this._setPower(checked, info, power_mark);
    }

    componentDidMount() {
        this.getPowerList();
        this.getWebUrlList();
    }

    _getWebUrlList() {
        const url = getConfig('request_get_web_url_list');
        LCAxios({
            url,
            type: "post",
            post_params: {},
            success: response => {
                if (response.data.code == 200) {
                    const web_url_list = response.data.data;
                    const columns = [
                        {
                            title: '名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                    ];
                    const _this = this;
                    web_url_list.map(function (val, key, arr) {
                        columns.push(
                            {
                                title: (
                                    //鼠标悬停提示   power_mark
                                    <Tooltip title={`web_url:${val.web_url}`}>
                                        {val.des}
                                    </Tooltip>
                                ),
                                key: val.des,
                                render: (text, record, index) => {
                                    //checked 启用是选中
                                    const checked = record.power & val.power_mark;
                                    return (
                                        <Checkbox
                                            onChange={(e) => _this.setPower(e.target.checked, record, val.power_mark)}
                                            defaultChecked={checked}
                                        />
                                    );
                                }
                            },
                        )
                    });
                    this.setState({columns})
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _getPowerList() {
        const url = getConfig('request_get_power_list');
        LCAxios({
            url,
            type: "get",
            post_params: {},
            success: response => {
                if (response.data.code == 200) {
                    const role_list = response.data.data.power_role;
                    let power_role_data = [];
                    role_list.map(function (value, key, arr) {
                        const id = value.id;
                        const name = value.name;
                        const power = value.web_url_power;
                        let obj = {
                            key: id,
                            id,
                            name,
                            power,
                            index: key,
                        };
                        power_role_data.push(obj)
                    });
                    //state 设置成功后设置表格
                    this.setState({data: power_role_data});
                } else {
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _setPower(checked, info, power_mark) {
        let power = info.power;
        if (checked) {//选中
            power = parseInt(power) + parseInt(power_mark);
        } else {//取消
            power = parseInt(power) - parseInt(power_mark);
        }
        const url = getConfig('request_set_web_url_power');
        LCAxios({
            url,
            type: "post",
            post_params: {
                id: info.id,
                power
            },
            success: response => {
                if (response.data.code == 200) {
                    alert("设置成功");
                    this.getPowerList();
                } else {
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    render() {
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    pagination={false}
                />
                {this.state.login}
            </div>
        )
    }
}