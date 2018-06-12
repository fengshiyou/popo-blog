import React from 'react';
import {Table,Input,Button,Icon} from 'antd'
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'

export default class SettingLogManage extends React.Component{
    constructor(){
        super();
        this.state = {
            data:null,
            pagination:null,
            login:null,
            acount_search:null,//对账号搜索
            client_ip_search:null,//对客户端IP搜索
            action_search:null,//对动作搜索
            params_search:null,//对参数搜索
        };
        //获取日志列表
        this.getList = () => this._getList();
        //设置页数
        this.setPage = (pagination) => this._setPage(pagination);
        //设置搜索内容
        this.setSearch = (e,key) => this._setSearch(e,key);
        //搜搜
        this.search = () => this._search();
    }
    componentDidMount(){
        this.getList();
    }
    _search(){
            this.setState({
                page_no:1
            },this.getList)
    }
    _getList(){
        const url = getConfig('request_get_log_list');
        LCAxios({
            url,
            type: "POST",
            post_params: {
                page_no: this.state.page_no,
                acount_search:this.state.acount_search,
                params_search:this.state.params_search,
                action_search:this.state.action_search,
                client_ip_search:this.state.client_ip_search,
            },
            success: response => {
                if (response.data.code == 200) {
                    const list = response.data.data.list;
                    const total = response.data.data.total;
                    const page_no = response.data.data.page_no;
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
                    pagination.current = page_no;
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
    _setSearch(e,key){
        const value = e.target.value;
        this.setState(()=>({
            [key]:value
        }));
    }
    render (){
        const columns = [
            {
                title: '账号',
                dataIndex: 'acount',
                key: 'name',
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
                <div className="margin-t-5">
                    <span className="margin-l-5">
                        账号:<Input value={this.state.acount_search} onChange={(e)=>this.setSearch(e,'acount_search')} size="small" style={{width:80}}/>
                    </span>
                    <span className="margin-l-5">
                        客户端IP:<Input value={this.state.client_ip_search} onChange={(e)=>this.setSearch(e,'client_ip_search')} size="small" style={{width:80}}/>
                    </span>
                    <span className="margin-l-5">
                        动作:<Input value={this.state.action_search} onChange={(e)=>this.setSearch(e,'action_search')} size="small" style={{width:80}}/>
                    </span>
                    <span className="margin-l-5">
                        参数:<Input value={this.state.params_search} onChange={(e)=>this.setSearch(e,'params_search')} size="small"style={{width:80}}/>
                    </span>
                    <Button size="small" onClick={this.search} icon="search" type="primary" className="margin-l-50">搜索</Button>
                </div>
                <Table
                    className="margin-t-5"
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