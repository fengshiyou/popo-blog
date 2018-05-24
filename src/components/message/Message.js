import React from 'react'
import {Input, Icon, Button} from 'antd';
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'

export default class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            login: null,
            disabled: true,
            message: null,
        };
        //设置信息内容
        this.setMessage = (e) => this._setMessage(e)
        //提交
        this.submit = () => this._submit()
    }

    _submit() {
        const url = getConfig("request_message");
        const post_params = {
            message_type: this.props.message_type,
            status_type: this.props.status_type,
            parent_id:this.props.parent_id,
            message: this.state.message,
        };
        LCAxios({
            url,
            type: "post",
            post_params,
            success: response => {
                if(response.data.code == 200){//保存成功
                }else{//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        })
    }

    _setMessage(e) {
        let value = e.target.value.replace(/[\r\n]/g, "");//去掉换行
        value = value.replace(/[ ]/g, "");//去掉空客
        value = value.replace(/\ +/g, "");//去掉空客
        if (value.length > 0) {//有内容，可以点提交评论
            this.setState({
                disabled: false,
                message: e.target.value
            });
        } else {
            this.setState({
                disabled: true,
                message: null
            });
        }
    }

    render() {
        const {TextArea} = Input;
        const button_name = this.props.type == 2 ? "提交评论" : "提交留言";
        return (
            <div>
                <Icon type="message"/> <span style={{marginLeft: 5}}>留言支持markdown</span>
                <div style={{padding: 5}}>
                    <TextArea type="textarea" placeholder="文明社会，理性评论" autosize onChange={this.setMessage}/>
                </div>
                <div style={{textAlign: "right", marginRight: 5}}>
                    <Button disabled={this.state.disabled} type="primary" onClick={this.submit}>{button_name}</Button>
                </div>
                {this.state.login}
            </div>
        )
    }
}