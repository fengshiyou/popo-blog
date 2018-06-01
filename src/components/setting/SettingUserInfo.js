import React from 'react'
import {connect} from 'react-redux'
import {Input, Button} from 'antd'
import {getUserDetail, mapStateToProps} from '../../action/userDetailAction'
import LCAxios from '../../until/LoginCheckAxios'
import '../../css/setting/UserInfo.css'
import {getConfig} from "../../until/Tool";
import {Tooltip,Icon} from 'antd'//导入插件


class SettingUserInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            acount: null,
            header_graph: null,
            header_welcome: null,
            icon_url: null,
            link1: null,
            link1_des: null,
            link2: null,
            link2_des: null,
            link3: null,
            link3_des: null,
            motto: null,
        };
        //保存用户信息
        this.editUserInfo = () => this._editUserInfo();
        //设置用户信息
        this.setUserInfo = (e, key) => this._setUserInfo(e, key);
    }

    componentDidMount() {
        this.getUserDetail(localStorage.getItem('uid'))
    }

    getUserDetail(to_uid) {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(getUserDetail(to_uid))
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            acount: newProps.items.acount,
            header_graph: newProps.items.header_graph,
            header_welcome: newProps.items.header_welcome,
            icon_url: newProps.items.icon_url,
            link1: newProps.items.link1,
            link1_des: newProps.items.link1_des,
            link2: newProps.items.link2,
            link2_des: newProps.items.link2_des,
            link3: newProps.items.link3,
            link3_des: newProps.items.link3_des,
            motto: newProps.items.motto,
            uid: newProps.items.uid,
        })
    }

    _editUserInfo() {
        const {dispatch} = this.props;
        const url = getConfig('request_edit_user_info');
        LCAxios({
            url,
            type: "post",
            post_params: this.state,
            success: response => {
                if (response.data.code == 200) {//保存成功
                    //设置用户信息
                    dispatch({type: "EDIT_USER_DETAIL", items: response.data.data});
                } else {//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _setUserInfo(e, key) {
        const value = e.target.value;
        //setState 根据变量key设置内容
        this.setState(() => ({
            [key]: value
        }));
    }

    render() {
        return (
            <div className="user-info">
                <div className="user-info-item">
                    <div className="user-info-item-des">欢迎语</div>
                    <Input size="small" value={this.state.header_welcome} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'header_welcome')}/>
                    <Tooltip title="主页左上角欢迎语">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">头部签名</div>
                    <Input size="small" value={this.state.header_graph} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'header_graph')}/>
                    <Tooltip title="欢迎语后面的灰色字">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">头像地址</div>
                    <Input size="small" value={this.state.icon_url} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'icon_url')}/>
                    <Tooltip title="主页的头像，不填则默认头像">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">座右铭</div>
                    <Input size="small" value={this.state.motto} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'motto')}/>
                    <Tooltip title="账号下面的一段文字">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接1地址</div>
                    <Input size="small" value={this.state.link1} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link1')}/>
                    <Tooltip title="座右铭下面的链接地址">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接1描述</div>
                    <Input size="small" value={this.state.link1_des} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link1_des')}/>
                    <Tooltip title="座右铭下面的链接描述">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接2地址</div>
                    <Input size="small" value={this.state.link2} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link2')}/>
                    <Tooltip title="座右铭下面的链接地址">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接2描述</div>
                    <Input size="small" value={this.state.link2_des} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link2_des')}/>
                    <Tooltip title="座右铭下面的链接描述">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接3地址</div>
                    <Input size="small" value={this.state.link3} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link3')}/>
                    <Tooltip title="座右铭下面的链接地址">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item">
                    <div className="user-info-item-des">超链接3描述</div>
                    <Input size="small" value={this.state.link3_des} style={{width: "50%"}} onChange={(e) => this.setUserInfo(e, 'link3_des')}/>
                    <Tooltip title="座右铭下面的链接描述">
                        <Icon className="margin-l-5" type="question-circle-o" />
                    </Tooltip>
                </div>
                <div className="user-info-item text-center">
                    <Button type='primary' onClick={this.editUserInfo}>保存</Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SettingUserInfo)