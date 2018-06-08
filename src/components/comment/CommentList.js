import React from 'react'
import axios from 'axios'
import {Pagination} from 'antd'
import {getConfig,myAxios} from '../../until/Tool'
import CommentInfo from "./CommentInfo";

export default class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],//评论列表
            page: null,//评论页数
            page_no:1,
            id:null,

        };
        //获取列表
        this.getCommentList = () => this._getCommentList();
        //新增留言
        this.newComment = (floor,id,content) => this._newComment(floor,id,content);
        //分页变化
        this.setPageNo = (page_no) => this._setPageNo(page_no)

    }

    _getCommentList() {
        const url = getConfig('request_get_comment_list') + "?comment_type=" + this.props.comment_type + "&id=" + this.state.id + "&page_no=" + this.state.page_no;
        myAxios({
            url,
            type:'get',
            successCallBack:response => {
                let temp = [];
                //当前页数
                const page_no = response.data.data['page_no'];
                //列表
                const list = response.data.data.list;
                //总评论数
                const total = response.data.data.total;
                list.map(function (val, key, arr) {
                    const floor = (page_no - 1) * 10 + key + 1;//几楼
                    temp.push(<CommentInfo reply_count={val.reply_count} comment_uid={val.uid} created_at={val.created_at} key={key} comment_id={val.id} floor={floor} content={val.content} acount={val.acount} />)
                });
                this.setState({
                    list: temp,
                    page_no: page_no,
                    total:total,
                });
                const page = <Pagination showQuickJumper defaultCurrent={response.data.data.page_no} total={response.data.data.total} defaultPageSize={response.data.data.per_page} onChange={this.setPageNo}/>
                this.setState({page})
            }
        });
    }
    _setPageNo(page_no) {
        this.setState({page_no}, this.getCommentList);
        //页面滚动到留言输入框位置
        const dom = document.getElementById('comment_input');
        dom.scrollIntoView()
    }
    _newComment(floor,id,content) {
        let temp = [];
        temp.push(<CommentInfo reply_count={0} key={floor} comment_id={id} floor={floor} content={content} />)
        this.setState({
            list: this.state.list.concat(temp),
        });
    }
    componentDidMount() {
        this.setState({
           id:this.props.id,
        },this.getCommentList);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            id:newProps.id,
        },this.getCommentList);
    }

    render() {
        return (
            <div>
                {this.state.list}
                {this.state.page}
            </div>
        )
    }
}