import React from 'react';
import {Table} from 'antd'
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'

export default class SettingLogManage extends React.Component{
    constructor(){
        super();
        this.state = {
            data:null,
            pagination:null,
            login:null,
        }
        //获取日志列表
        this.getList = () => this._getList();
        //设置页数
        this.setPage = (pagination) => this._setPage(pagination)
    }
    componentDidMount(){
        this.getList();
    }
    _getList(){
        const url = getConfig('request_get_log_list');
        LCAxios({
            url,
            type: "post",
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
                            acount:val.acount,
                            client_ip:val.client_ip,
                            action:val.action,
                            params:val.params,
                            created_at: val.created_at,
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
    _setPage(pagination) {
        this.setState({page_no: pagination.current}, this.getList);
    }
    render (){
        const columns = [
            {
                title: '账号',
                dataIndex: 'acount',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '客户端IP',
                dataIndex: 'client_ip',
                key: 'client_ip',
            },
            {
                title: '动作',
                dataIndex: 'action',
                key: 'action',
            },
            {
                title: '参数',
                dataIndex: 'params',
                key: 'params',
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
            },
        ];
        return(
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