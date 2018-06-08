import React from 'react'
import {Table, Checkbox, Button, Icon,Tooltip} from 'antd'
import axios from 'axios'
import {getConfig} from '../../until/Tool'
import SettingDialog from "./SettingDialog";
import LCAxios from '../../until/LoginCheckAxios'

export default class SettingPowerGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            table: null,//表格
            columns: null,//表格列数据
            data: [],//表格行数据
            modal: null,//对话框
            login:null,//登陆
        };
        //设置表格
        this.setTable = () => this._setTable();
        //设置权限
        this.setPower = (e, index, power) => this._setPower(e, index, power);
        //设置表头
        this.setColumns = () => this._setColumns();
        //保存
        this.save = (index) => this._save(index);
        //显示模态框
        this.showModal = (type, info) => this._showModal(type, info);
        //关闭模态框
        this.closeModal = () => this._closeModal();
    }

    _setTable() {
        this.setState({
            table: (
                <Table
                    scroll={{x:this.state.columns.length * 150}}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    pagination={false}
                />
            )
        })
    }

    _showModal(type, info) {
        let modal = '';
        switch (type) {
            //新增权限组
            case 'add_power_role':
                modal = (
                    <div>
                        <SettingDialog type='add_power_role' ok={this.setColumns} afterClose={this.closeModal} visible={true}/>
                    </div>
                );
                this.setState({modal});
                break;
            //新增权限路由
            case 'add_power_url':
                modal = (
                    <div>
                        <SettingDialog type='add_power_url' ok={this.setColumns} afterClose={this.closeModal} visible={true}/>
                    </div>
                );
                this.setState({modal});
                break;
            case 'del_power_role':
                modal = (
                    <div>
                        <SettingDialog info={info} type='del_power_role' ok={this.setColumns} afterClose={this.closeModal} visible={true}/>
                    </div>
                );
                this.setState({modal});
                break;
            case 'del_power_url':
                modal = (
                    <div>
                        <SettingDialog info={info} type='del_power_url' ok={this.setColumns} afterClose={this.closeModal} visible={true}/>
                    </div>
                );
                this.setState({modal});
                break;
        }
    }

    _closeModal() {
        this.setState({modal: null})
    }

    /**
     *
     * @param e
     * @param index 权限组的索引
     * @param power 将要设置的权限
     * @private
     */
    _setPower(e, index, power) {
        //角色组当前power 权限
        const role_power = this.state.data[index].power;
        if (e.target.checked) {//选中
            if (role_power & power) {//位运算  如果包含权限  则什么都不做
                return;
            } else {//如果不包含权限，则对应权限组加上power 值
                this.state.data[index].power = parseInt(this.state.data[index].power) + parseInt(power);
            }
        } else {//取消
            if (role_power & power) {//如果包含权限，则对应权限组减去power 值
                this.state.data[index].power = parseInt(this.state.data[index].power) - parseInt(power);
            } else {//位运算  如果不包含权限  则什么都不做
                return;
            }
        }

    }

    _save(index) {
        const url = getConfig('request_set_power');
        LCAxios({
            url,
            type: "POST",
            post_params: this.state.data[index],
            success: response => {
                if (response.data.code == 200) {//保存成功
                    alert("保存成功");
                } else {//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _setColumns() {
        const url = getConfig('request_get_power_list');
        LCAxios({
            url,
            type: "get",
            post_params: {},
            success: response => {
                //权限路由
                const power_url = response.data.data.power_url;
                //权限组
                const power_role = response.data.data.power_role;
                //表格第一列
                let columns = [
                    {
                        title: <div>Name</div>,
                        dataIndex: 'name',
                        key: 'name',
                        width:100
                    }
                ];
                //定义this
                const _this = this;
                //遍历权限路由  组装表头
                power_url.map(function (value, key, arr) {
                    const power_mark = value.power_mark;
                    let obj = {
                        title: (
                            //鼠标悬停提示   power_mark
                            <Tooltip title={`power_mark:${value.power_mark}`}>
                                {value.name}
                                <Icon
                                    onClick={() => _this.showModal('del_power_url', value)}
                                    type="delete"
                                />
                                <br/>
                                {value.url}
                            </Tooltip>
                        ),
                        width:150,
                        key: value.power_mark,
                        render: (text, record, index) => {
                            //checked 如果行数据权限包含权限路由权限， 则选中
                            const checked = record.power & value.power_mark;
                            return (
                                <Checkbox
                                    onChange={(e) => _this.setPower(e, index, value.power_mark)}
                                    defaultChecked={checked}
                                />
                            );
                        }
                    };
                    columns.push(obj);
                });
                columns.push(
                    {
                        title: "操作",
                        key: 'set',
                        width:150,
                        render: (text, record, index) => {
                            return (
                                <div>
                                    <Button type="primary" onClick={() => this.save(index)} size="small">保存</Button>
                                    <Button type="danger" size="small" onClick={() => this.showModal('del_power_role', record, index)}>删除</Button>
                                </div>
                            );
                        }
                    }
                );
                let power_role_data = [];
                power_role.map(function (value, key, arr) {
                    const id = value.id;
                    const name = value.name;
                    const power = value.power;
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
                this.setState({columns,data:power_role_data}, this.setTable);
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    componentDidMount() {
        this.setColumns();

    }

    render() {
        return (
            <div>
                <div style={{overflow: "auto"}}>{this.state.table}</div>
                <div className="text-center margin-t-50">
                    <Button type="primary" onClick={() => this.showModal('add_power_url')}>增加权限路由</Button>
                    <Button className="margin-l-50" type="primary" onClick={() => this.showModal('add_power_role')}>增加权限组</Button>
                    {this.state.modal}
                </div>
                {this.state.login}
            </div>
        )
    }
}