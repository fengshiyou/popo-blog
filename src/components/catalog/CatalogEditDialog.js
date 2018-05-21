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
        };
        //对话框关闭
        this.close = () => this._close();
        //确认
        this.ok = () => this._ok();
        //对话框完全关闭之后
        this.afterClose = () => this._afterClose()
    }

    _ok() {
        //判断类型
        switch (this.props.type) {
            //目录重命名
            case "rename":
                const url = getConfig('request_rename_catalog');
                LCAxios({
                    url,
                    type: "post",
                    post_params: {},
                    success: response => {
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
                dialog_info = (<Input placeholder="请输入新的目录名称"/>);
                title = "修改“" + this.props.catalog_name + "”目录名称";
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