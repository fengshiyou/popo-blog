import React from 'react'
import {Button, Modal, Tooltip} from 'antd'//导入插件
import {connect} from 'react-redux'
import axios from 'axios'
import CatalogEditDialog from './CatalogEditDialog'
import {getMyCatalog, mapStateToProps, initMyCatalog} from '../../action/myCatalogAction'
import {getConfig} from "../../until/Tool";


class CatalogMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            edit_modal: null,//修改属性的对话框
            edit_modal_visible: false,//修改属性的对话框
            edit_button_opacity: {//透明度
                opacity: 0
            },
            list: [] ,//列表   查看他人博客的时候使用
        };
        //格式化catalog_menu
        this.formatCatalogMenu = (catalog_list) => this._formatCatalogMenu(catalog_list);
        //获取我的目录
        this.getCatalogList = () => this._getCatalogList();
        //重新获取我的目录
        this.initMyCatalogList = () => this._initMyCatalogList();
        //显示修改属性的对话框
        this.showEditModal = (type, name, id) => this._showEditModal(type, name, id);
        //修改属性的对话框完全关闭之后
        this.afterCloseEditModal = () => this._afterCloseEditModal();
        //设置按钮透明度
        this.setEditButtonOp = (e, id, ratio) => this._setEditButtonOp(e, id, ratio);
    }

    //关闭修改属性的对话框
    _afterCloseEditModal(e, id, ratio) {
        //删除对话框
        this.setState({edit_modal: null})
    }

    //设置按钮透明度
    _setEditButtonOp(e, id, ratio) {
        const element_list = document.getElementsByClassName("button_group" + id);
        for (var i = 0; i < element_list.length; i++) {
            element_list[i].style.opacity = ratio;
        }
    }

    //显示修改属性的对话框
    _showEditModal(button_type, name, id) {
        const edit_modal = (
            <CatalogEditDialog
                catalog_name={name} //目录目标名称
                catalog_id={id} //目录目标ID
                visible={true} //显示
                type={button_type} //按钮类型  rename:重命名 add:新增子目录 del:删除该目录
                afterClose={this.afterCloseEditModal} //对话框关闭后回调
                ok_sucess={this.initMyCatalogList}/> //对话框中的button 点击确定并且执行成功后回调
        );
        //显示对话框
        this.setState({edit_modal});
    }

    //目录数据发生变化  重新获取一次
    _initMyCatalogList() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(initMyCatalog());
    }

    componentDidMount() {
        if (this.props.menu_type == 1) {//1:个人博客(显示个人目录) 2:他人博客(显示他人目录)
            //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
            const {dispatch} = this.props;
            //个人博客 通过action生成数据
            dispatch(getMyCatalog());
        } else {
            const url = getConfig('request_get_catalog') + "?uid=" + this.props.uid;
            //他人博客  去后台获取
            axios.get(url).then(
                response => {
                    this.setState({list: response.data.data})
                }
            ).catch()
        }
    }

    //获取列表
    _getCatalogList() {
        if (this.props.menu_type == 1) {//1:个人博客(显示个人目录) 2:他人博客(显示他人目录)
            return this.formatCatalogMenu(this.props.items);
        } else {
            return this.formatCatalogMenu(this.state.list);
        }
    }

    //格式化catalog_list
    _formatCatalogMenu(catalog_list) {
        if (!catalog_list) {
            return [];
        }
        let result_catalog_menu = [];
        for (let i = 0; i < catalog_list.length; i++) {
            const id = catalog_list[i].id;
            const name = catalog_list[i].catalog_name;
            let button_group = '';
            if (this.props.menu_type == 1) {//1:个人博客(显示个人目录和功能按钮) 2:他人博客(显示他人目录)
                let edit_button = '';
                if( catalog_list[i].parent_id != -1){
                    edit_button = (
                        <Tooltip title="修改名称" mouseEnterDelay={0.7}>
                            <Button
                                className={`margin-l-5 ${'button_group' + id}`}
                                style={this.state.edit_button_opacity}
                                ghost
                                type='primary'
                                icon="edit"
                                onClick={() => this.showEditModal('rename', name, id)}
                                size="small"/>
                        </Tooltip>
                    );
                }
                const add_button = (
                    <Tooltip title="新增子目录" mouseEnterDelay={0.7}>
                        <Button
                            className={`margin-l-5 ${'button_group' + id}`}
                            style={this.state.edit_button_opacity}
                            ghost
                            type='primary'
                            icon="plus-circle"
                            onClick={() => this.showEditModal('add', name, id)}
                            size="small"/>
                    </Tooltip>
                );
                const del_button = (
                    <Tooltip title="删除该目录" mouseEnterDelay={0.4}>
                        <Button
                            className={`margin-l-5 ${'button_group' + id}`}
                            style={this.state.edit_button_opacity}
                            ghost
                            type='primary'
                            icon="minus-circle"
                            onClick={() => this.showEditModal('del', name, id)}
                            size="small"/>
                    </Tooltip>
                );
                button_group = (
                <span onMouseOver={(e) => this.setEditButtonOp(e, id, 0.9)} onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}>
                    {edit_button}
                    {add_button}
                    {del_button}
                </span>
                );
            }

            if (catalog_list[i].next.length > 0) {//如果有子目录
                result_catalog_menu.push(
                    <div key={id} data-catalog-id={id}>
                        <div style={{position: "relative", left: 10}}>
                            <span
                                onMouseOver={(e) => this.setEditButtonOp(e, id, 0.3)}
                                onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            >
                                {name}（{catalog_list[i].count}）
                            </span>
                            {button_group}
                            {this.formatCatalogMenu(catalog_list[i].next)}
                        </div>
                    </div>
                )
            } else {
                result_catalog_menu.push(
                    <div key={catalog_list[i].id}>
                        <div style={{position: "relative", left: 10}}>
                            <span
                                onMouseOver={(e) => this.setEditButtonOp(e, id, 0.3)}
                                onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            >
                                {name}（{catalog_list[i].count}）
                            </span>
                            {button_group}
                        </div>
                    </div>
                )
            }
        }
        return result_catalog_menu
    }

    render() {
        let catalog_list = this.getCatalogList();
        return (
            <div>
                {catalog_list}
                {this.state.edit_modal}
            </div>
        )
    }
}

export default connect(mapStateToProps)(CatalogMenu)