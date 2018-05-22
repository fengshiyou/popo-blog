import React from 'react'
import {Modal, Input} from 'antd'//导入插件
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'


export default class CatalogEditDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            dialog_info: null,
            login: null,
            new_name: null,
        };
        //对话框关闭
        this.close = () => this._close();
        //确认
        this.ok = () => this._ok();
        //对话框完全关闭之后
        this.afterClose = () => this._afterClose()
    }

    _ok() {
        let url = '';
        //判断类型
        switch (this.props.type) {
            //目录重命名
            case "rename":
                url = getConfig('request_rename_catalog');
                LCAxios({
                    url,
                    type: "post",
                    post_params: {
                        catalog_id: this.props.catalog_id,
                        new_name: this.state.new_name,
                    },
                    success: response => {
                        if (response.data.code !== 200) {
                            alert(response.data.msg);
                        } else {
                            //点击确定的回掉
                            this.props.ok_sucess();
                            this.setState({visible: false})
                        }

                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
            //新增目录
            case "add":
                url = getConfig('request_add_catalog');
                LCAxios({
                    url,
                    type: "post",
                    post_params: {
                        catalog_id: this.props.catalog_id,
                        catalog_name: this.state.new_name,
                    },
                    success: response => {
                        if (response.data.code !== 200) {
                            alert(response.data.msg);
                        } else {
                            //点击确定的回掉
                            this.props.ok_sucess();
                            this.setState({visible: false})
                        }

                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
            //新增目录
            case "del":
                url = getConfig('request_del_catalog');
                LCAxios({
                    url,
                    type: "post",
                    post_params: {
                        catalog_id: this.props.catalog_id,
                    },
                    success: response => {
                        if (response.data.code !== 200) {
                            alert(response.data.msg);
                        } else {
                            //点击确定的回掉
                            this.props.ok_sucess();
                            this.setState({visible: false})
                        }

                    },
                    failSet: (login_node) => {
                        this.setState({login: login_node})
                    },
                });
                break;
        }
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

    componentWillUnmount() {
        console.log("销毁了 rename")
    }

    _afterClose() {
        this.props.afterClose();
    }

    render() {
        let dialog_info = null;
        let title = null;
        //组装dialog中的内容
        switch (this.props.type) {
            //目录重命名
            case "rename":
                dialog_info = (<Input placeholder="请输入新的目录名称" onChange={(e) => {
                    this.setState({new_name: e.target.value})
                }}/>);
                title = "修改“" + this.props.catalog_name + "”目录名称";
                break;
            //新增目录
            case "add":
                dialog_info = (<Input placeholder="请输入目录名称" onChange={(e) => {
                    this.setState({new_name: e.target.value})
                }}/>);
                title = "在“" + this.props.catalog_name + "”目录下新增子目录";
                break;
            //删除目录
            case "del":
                dialog_info = (<span>该目录下的所有文章将会转移到上级目录中</span>);
                title = "确定要删除“" + this.props.catalog_name + "”目录吗？";
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