import React from 'react'
import {Button, Modal, Tooltip} from 'antd'//导入插件
import {connect} from 'react-redux'
import CatalogEditDialog from './CatalogEditDialog'
import {getMyCatalog, mapStateToProps} from '../../action/myCatalogAction'


class CatalogSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            edit_modal: null,//修改属性的对话框
            edit_modal_visible: false,//修改属性的对话框
            edit_button_opacity: {
                opacity: 0
            },
        }
        //格式化catalog_menu
        this.formatCatalogMenu = (catalog_list) => this._formatCatalogMenu(catalog_list);
        //显示修改属性的对话框
        this.showEditModal = (type,name,id) => this._showEditModal(type,name,id);
        //修改属性的对话框完全关闭之后
        this.afterCloseEditModal = () => this._afterCloseEditModal();
        //设置按钮透明度
        this.setEditButtonOp = (e, id, ratio) => this._setEditButtonOp(e, id, ratio);
    }

    //关闭修改属性的对话框
    _afterCloseEditModal(e, id, ratio) {
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
    _showEditModal(type,name,id) {
        const edit_modal = (
            <CatalogEditDialog catalog_name={name} catalog_id={id} visible={true} type={type} afterClose={this.afterCloseEditModal} />
        )
        this.setState({edit_modal})
    }

    componentDidMount() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(getMyCatalog());
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
            const button_group = (
                <span>
                    <Tooltip title="修改名称" mouseEnterDelay={0.7}>
                        <Button
                            onMouseOver={(e) => this.setEditButtonOp(e, id, 0.9)}
                            onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            className={`margin-l-5 ${'button_group' + id}`}
                            style={this.state.edit_button_opacity}
                            ghost
                            type='primary'
                            icon="edit"
                            onClick={() => this.showEditModal('rename',name,id)}
                            size="small"/>
                    </Tooltip>
                    <Tooltip title="新增子目录" mouseEnterDelay={0.7}>
                        <Button
                            onMouseOver={(e) => this.setEditButtonOp(e, id, 1)}
                            onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            className={`margin-l-5 ${'button_group' + id}`}
                            style={this.state.edit_button_opacity}
                            ghost
                            type='primary'
                            icon="plus-circle"
                            size="small"/>
                    </Tooltip>
                    <Tooltip title="删除该目录" mouseEnterDelay={0.4}>
                        <Button
                            onMouseOver={(e) => this.setEditButtonOp(e, id, 1)}
                            onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            className={`margin-l-5 ${'button_group' + id}`}
                            style={this.state.edit_button_opacity}
                            ghost
                            type='primary'
                            icon="minus-circle"
                            size="small"/>
                    </Tooltip>
                </span>
            );
            if (catalog_list[i].next.length > 0) {
                result_catalog_menu.push(
                    <div key={id} data-catalog-id={id}>
                        <div style={{position: "relative", left: 10}}>
                            <span
                                onMouseOver={(e) => this.setEditButtonOp(e, id, 0.3)}
                                onMouseLeave={(e) => this.setEditButtonOp(e, id, 0)}
                            >
                                {name}
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
                                {name}
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
        //格式化数据并且赋值给this.state.catalog_list
        let catalog_list = this.formatCatalogMenu(this.props.items);
        return (
            <div>
                {catalog_list}
                {this.state.edit_modal}
            </div>
        )
    }
}

export default connect(mapStateToProps)(CatalogSelect)