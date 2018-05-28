import React from 'react'
import Marked from 'marked'
import axios from 'axios'
import {Icon, Input, Button, Pagination} from 'antd'
import HighLight from 'highlight.js'
import "../../css/content/Content.css"
import {getConfig} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'
import ReplyInfo from "./ReplyInfo";


export default class CommentInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            reply_list: null,
            reply_show: false,
            comment_uid: null,//该条评论的作者
            content: null,//回复的内容
            disabled: true,//是否可以回复
            page_no: 1,//页数(回复列表的页数)
        };
        //显示回复内容
        this.showReplyList = () => this._showReplyList();
        //设置回复内容
        this.setContent = (e) => this._setContent(e);
        //提交回复
        this.submit = () => this._submit();
        //获取回复列表
        this.getReplyList = () => this._getReplyList();
        //设置页数
        this.setPageNo = (page_no) => this._setPageNo(page_no);
        //插入回复(点击某条回复后进行回复)
        this.insertReply = (to_uid, index, content) => this._insertReply(to_uid, index, content)
    }

    componentWillMount() {
        Marked.setOptions({
            highlight: code => HighLight.highlightAuto(code).value,
        });
    }

    componentDidMount() {
        this.setState({
            comment_uid: this.props.comment_uid,
        });
    }

    componentWillReceiveProps(newProps) {
        //因为上游传过来的key是一样的  所以react没有重新画列表 而是更新了列表的props 所以要初始化一下reply_show
        this.setState({reply_show: false})
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

    _setPageNo(page_no) {
        this.setState({page_no}, this.getReplyList);
        //页面滚动到被回复的留言的位置
        const dom = document.getElementById('comment_id_' + this.props.comment_id);
        dom.scrollIntoView();
    }

    _submit() {
        const url = getConfig("request_add_reply");
        const post_params = {
            comment_id: this.props.comment_id,
            content: this.state.content,
        };
        LCAxios({
            url,
            type: "post",
            post_params,
            success: response => {
                if (response.data.code == 200) {//保存成功
                    let temp = [];
                    const insertReply = this.insertReply;
                    //key 最大就到10  ps:该处评论不会涉及到对谁评论
                    temp.push(
                        <ReplyInfo
                            acount={localStorage.getItem('acount')}
                            uid={localStorage.getItem('uid')}
                            content={this.state.content}
                            key={response.data.data.id}
                            index={this.state.reply_list.length + 1}
                            created_at={response.data.data.created_at}
                            insertReply={insertReply}
                        />
                    );
                    //将新增的评论放到当前页面回复列表的最后
                    this.setState({
                        reply_list: this.state.reply_list.concat(temp),
                        content: null,//清空输入框内容
                    });
                } else {//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    /**
     *
     * @param to_uid  对谁回复
     * @param index  回复列表的index
     * @private
     */
    _insertReply(to_uid, index, content) {
        const url = getConfig("request_add_reply");
        const post_params = {
            comment_id: this.props.comment_id,
            content: content,
            to_uid
        };
        LCAxios({
            url,
            type: "post",
            post_params,
            success: response => {
                if (response.data.code == 200) {//保存成功
                    let temp = [];
                    const insertReply = this.insertReply;
                    //key 最大就到10  ps:该处评论不会涉及到对谁评论
                    temp.push(
                        <ReplyInfo
                            acount={localStorage.getItem('acount')}
                            uid={localStorage.getItem('uid')}
                            content={response.data.data.content}
                            key={response.data.data.id}
                            to_acount={response.data.data.to_acount}
                            index={this.state.reply_list.length + 1}
                            created_at={response.data.data.created_at}
                            insertReply={insertReply}
                        />
                    );
                    //将新增的评论插入
                    this.state.reply_list.splice(index + 1, 0, temp)
                    this.setState({
                        reply_list: this.state.reply_list,
                    });
                    alert("回复成功");
                } else {//保存失败
                    alert(response.data.msg);
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }

    _showReplyList() {
        if (!this.state.reply_show) {//如果当前是没有展示回复列表
            this.getReplyList();
        }
        this.setState({reply_show: !this.state.reply_show});
    }

    _getReplyList() {
        const url = getConfig("request_get_reply_list") + "?comment_id=" + this.props.comment_id + "&page_no=" + this.state.page_no;
        axios.get(url).then(
            response => {
                let temp = [];
                //当前页数
                const page_no = response.data.data['page_no'];
                //列表
                const list = response.data.data.list;
                //总评论数
                const total = response.data.data.total;
                const insertReply = this.insertReply;
                list.map(function (val, key, arr) {
                    const floor = (page_no - 1) * 10 + key + 1;//几楼
                    temp.push(
                        <ReplyInfo
                            acount={val.acount}
                            to_uid={val.to_uid}
                            uid={val.uid}
                            to_acount={val.to_acount}
                            content={val.content}
                            key={val.id}
                            index={key}
                            created_at={val.created_at}
                            insertReply={insertReply}
                        />
                    )
                });
                this.setState({
                    reply_list: temp,
                    page_no: page_no,
                    total: total,
                });
                const page = <Pagination size="small" showQuickJumper defaultCurrent={response.data.data.page_no} total={response.data.data.total} defaultPageSize={response.data.data.per_page} onChange={this.setPageNo}/>
                this.setState({page})
            }
        ).catch();
    }

    render() {
        const {TextArea} = Input;
        return (
            <div className="margin-t-5 borderBottom" id={"comment_id_" + this.props.comment_id}>
                {this.props.floor}# &nbsp;&nbsp;{this.props.acount ? this.props.acount : "您刚刚"}说：
                <div className="content-detail" dangerouslySetInnerHTML={{__html: Marked(this.props.content)}}></div>
                <div>
                    <div><Icon type="calendar"/>{this.props.created_at}</div>
                    <div>
                        <Icon type="message"/>
                        <span onClick={this.showReplyList}>({this.props.reply_count})评论</span>
                    </div>
                </div>
                <div style={{display: this.state.reply_show ? "block" : "none", marginLeft: 20, marginRight: 20}}>
                    <div style={{backgroundColor: "#F6F6F6", margin: 10}}>
                        {this.state.reply_list}
                    </div>
                    {this.state.page}
                    <TextArea className="inline" style={{width: "80%"}} value={this.state.content} type="textarea" placeholder="文明社会，理性评论（支持markdown）" autosize onChange={this.setContent}/>
                    <Button disabled={this.state.disabled} className="margin-l-5" onClick={this.submit}>提交回复</Button>
                </div>
            </div>
        )
    }
}