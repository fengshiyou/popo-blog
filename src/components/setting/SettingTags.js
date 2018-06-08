import React from 'react'
import {Tag, Button, Modal, Input} from 'antd';
import {connect} from 'react-redux'
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'
import {getAllTags, mapStateToProps, initTags} from "../../action/tagsAction";


class SettingTags extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: null,
            edit_modal_visible: false,
            login: null,
            edit_tag_name:null,
            edit_tag_color:null,
            edit_tag_id:null,
        };
        //修改
        this.edit = ()=>this._edit();
        //删除tag
        this.del = () => this._del();
        //显示修改tag的modal框
        this.showEditModal = (tag_info) => this._showEditModal(tag_info);
        //关闭修改tag的modal框
        this.closeEditModal = () => this._closeEditModal();
    }

    componentDidMount() {
        const tags = this.props.items;
        this.setState({tags});
        const dispatch = this.props.dispatch;
        dispatch(getAllTags());
    }

    componentWillReceiveProps(newProps) {
        const tags = newProps.items;
        this.setState({tags})
    }

    _edit(){
        const url = getConfig('request_edit_tag');
        LCAxios({
            url,
            type: "POST",
            post_params: {
                id: this.state.edit_tag_id,
                color:this.state.edit_tag_color,
                name:this.state.edit_tag_name,
            },
            success: response => {
                if (response.data.code == 200) {
                    alert("修改成功");
                    const dispatch = this.props.dispatch;
                    dispatch(initTags());
                    this.setState({edit_modal_visible: false});
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    _del() {
        const url = getConfig('request_del_tag');
        LCAxios({
            url,
            type: "POST",
            post_params: {id: this.state.edit_tag_id},
            success: response => {
                if (response.data.code == 200) {
                    alert("删除成功");
                    const dispatch = this.props.dispatch;
                    dispatch(initTags());
                    this.setState({edit_modal_visible: false});
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _closeEditModal() {
        this.setState({
            edit_modal_visible: false
        });
    }

    _showEditModal(tag_info) {
        this.setState({
            edit_tag_color:tag_info.color,
            edit_tag_id:tag_info.id,
            edit_tag_name:tag_info.name,
            edit_modal_visible: true
        });
    }

    render() {
        const tags = this.state.tags;
        let tags_list = [];
        const _this = this;
        if (tags) {
            tags.map(function (val, key, arr) {
                tags_list.push(
                    <Tag
                        onClick={() => _this.showEditModal(val)}
                        key={key}
                        color={val.color}
                    >
                        {val.name}
                    </Tag>
                )
            });
        }
        return (
            <div className="margin-t-5 margin-l-5">
                <Button type="primary" size="small" onClick={this.showEditModal}>新增标签</Button>
                <br/>
                <div className="margin-t-5">
                    {tags_list}
                </div>
                <Modal
                    onOk={this.save}
                    onCancel={this.closeEditModal}
                    visible={this.state.edit_modal_visible}
                    title="修改标签"
                    footer={[
                        <Button key='cancel' onClick={this.closeEditModal} size='small'>取消</Button>,
                        <Button key='del' size='small' type='danger' onClick={this.del}>删除</Button>,
                        <Button key='ok' size='small' type='primary' onClick={this.edit}>确定</Button>,
                    ]}
                >
                    <Tag
                        color={this.state.edit_tag_color}
                    >
                        {this.state.edit_tag_name}
                    </Tag>
                    <div className="margin-t-5">
                    <Input addonBefore="名称" onChange={(e)=>this.setState({edit_tag_name:e.target.value})} value={this.state.edit_tag_name} />
                    <Input addonBefore="颜色" onChange={(e)=>this.setState({edit_tag_color:e.target.value})} value={this.state.edit_tag_color} />
                    </div>
                </Modal>
                {this.state.login}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SettingTags)