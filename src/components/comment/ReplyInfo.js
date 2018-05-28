import React from 'react'
import Marked from 'marked'
import HighLight from 'highlight.js'
import {Button, Input, Icon} from 'antd'
import "../../css/content/Content.css"


export default class ReplyInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            content: null,//回复的内容
            disabled: true,//是否可以回复
            will_reply: false,//是否要回复该条内容
        };
        //设置回复内容
        this.setContent = (e) => this._setContent(e);
        //设置是否要回复
        this.setWillReply = (status) => this._setWillReply(status);
        //提交回复
        this.submit = () => this._submit();
    }

    _submit() {
        this.props.insertReply(this.props.uid, this.props.index, this.state.content);
        this.setState({
            will_reply: false,
            content: null,
        });
    }

    componentWillMount() {
        Marked.setOptions({
            highlight: code => HighLight.highlightAuto(code).value,
        });
    }

    _setWillReply(status) {
        this.setState({will_reply: status})
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

        let speak_title = '';//对谁说
        if (this.props.to_acount) {//有对别人回复
            speak_title = this.props.acount + "对" + this.props.to_acount + "说：";
        } else {
            speak_title = this.props.acount + "说：";
        }
        return (
            <div className="margin-t-5 borderBottomDashed">
                <div>
                    <Icon type="calendar"/>
                    {this.props.created_at}
                </div>
                {speak_title}
                <div className="content-detail" dangerouslySetInnerHTML={{__html: Marked(this.props.content)}}></div>
                <div style={{textAlign: 'right', display: this.state.will_reply ? "none" : "block"}}>
                    <Button onClick={() => this.setWillReply(true)}>回复该条</Button>
                </div>
                <div style={{display: this.state.will_reply ? "block" : "none"}}>
                    <TextArea className="inline" style={{width: "80%"}} type="textarea" placeholder="文明社会，理性评论（支持markdown）" autosize onChange={this.setContent}/>
                    <Button disabled={this.state.disabled} type="primary" value={this.state.content} className="margin-l-5" onClick={this.submit}>提交回复</Button>
                    <Button className="margin-l-5" onClick={() => this.setWillReply(false)}>取消回复</Button>
                </div>
            </div>
        )
    }
}