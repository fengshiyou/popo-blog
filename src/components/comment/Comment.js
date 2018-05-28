import React from 'react'
import {Input, Icon, Button} from 'antd';
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'
import CommentList from './CommentList'

export default class Comment extends React.Component {
    constructor() {
        super();
        this.state = {
            login: null,
            disabled: true,
            content: null,
        };
        //设置信息内容
        this.setContent = (e) => this._setContent(e);
        //提交
        this.submit = () => this._submit()
    }

    _submit() {
        const url = getConfig("request_add_comment");
        const post_params = {
            comment_type: this.props.comment_type,
            id:this.props.id,//comment_type blog:blog id  user:user id
            content: this.state.content,
        };
        LCAxios({
            url,
            type: "post",
            post_params,
            success: response => {
                if (response.data.code == 200) {//保存成功
                    //保存成功后获取最后一条评论 （重服务器）
                    this.refs.comment_list.newComment(response.data.data.floor,response.data.data.id,this.state.content);
                } else {//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _setContent(e) {
        let value = e.target.value.replace(/[\r\n]/g, "");//去掉换行
        value = value.replace(/[ ]/g, "");//去掉空客
        value = value.replace(/\ +/g, "");//去掉空客
        if (value.length > 0) {//有内容，可以点提交评论
            this.setState({
                disabled: false,
                content: e.target.value
            });
        } else {
            this.setState({
                disabled: true,
                content: null
            });
        }
    }

    render() {
        const {TextArea} = Input;
        let button_name = '';
        if (this.props.comment_type == "blog") {//对博客留言
            button_name = "提交评论";
        } else if (this.props.comment_type == "user") {//对个人留言
            button_name = "提交留言";
        }
        return (
            <div>
                <Icon type="message"/> <span style={{marginLeft: 5}}>留言支持markdown</span>
                <div style={{padding: 5}}>
                    <TextArea type="textarea" placeholder="文明社会，理性评论" autosize onChange={this.setContent}/>
                </div>
                <div style={{textAlign: "right", marginRight: 5}}>
                    <Button disabled={this.state.disabled} type="primary" onClick={this.submit}>{button_name}</Button>
                </div>
                {this.state.login}
                <CommentList ref="comment_list" comment_type={this.props.comment_type} id={this.props.id} />
            </div>
        )
    }
}