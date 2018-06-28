import React from 'react'
import BlogListItem from './BlogListItem'
import axios from 'axios'
import {Pagination, Button} from 'antd'
import NeadLoginButton from '../login/NeadLoginButton'
import {getConfig, myAxios} from "../../until/Tool"
//@todo 登陆按钮封装
export default class BlogList extends React.Component {
    constructor() {
        super();
        this.state = {
            blog_item_list: [],
            search: '',
            total: 1,
            page_no: 1,
            per_page: 1,
            page: ''
        };
        this.setPageNo = (page_no) => this._setPageNo(page_no)
    }

    //接收到新的参数的时候触发，传入新参数(变化过的参数)。旧参数还可以通过this.props获得
    componentWillReceiveProps(newProps) {
        //如果查询参数没变化  则不请求后台
        if (this.props.search == newProps.search && this.props.blog_type == newProps.blog_type && this.props.to_uid == newProps.to_uid) {
            return;
        }
        this.setState({
            search: newProps.search,
            page_no: 1,
            blog_type: newProps.blog_type,
            to_uid: newProps.to_uid,
        }, this.setBlogItemList)
    }

    componentDidMount() {
        this.setState({
            search: this.props.search,
            blog_type: this.props.blog_type,
            to_uid: this.props.to_uid,
        }, this.setBlogItemList)
    }

    _setPageNo(page_no) {
        this.setState({page_no}, this.setBlogItemList)
    }

    setBlogItemList() {
        let url = getConfig("request_get_blog_list");
        url += this.state.search ? this.state.search + "&page_no=" + this.state.page_no : "?page_no=" + this.state.page_no;
        if (this.state.blog_type == 'home') {//博客大厅
            url += "&uid=";
        } else if (this.state.blog_type == 'myblog') {//个人博客
            url += "&uid=" + localStorage.getItem('uid');
        } else {//他人博客
            url += "&uid=" + this.state.blog_type;
        }

        const blog_item_list = [];
        myAxios({
            url,
            type:'get',
            successCallBack: response => {
                const response_list = response.data.data.list;
                const blog_type = this.props.blog_type;
                if (response_list.length > 0) {
                    const to_uid = this.state.to_uid;
                    response_list.map(function (value, key, arr) {
                        const content = value.content ? value.content : "";
                        blog_item_list.push(<BlogListItem
                            title={value.title}
                            comment_count={value.comment_count}
                            key={key}
                            created_at={value.created_at}
                            tags={value.tags}
                            catalog={value.catalog}
                            catalog_id={value.catalog_id}
                            id={value.id}
                            to_uid={to_uid}
                            blog_uid={value.uid}
                            blog_type={blog_type}
                            acount={value.acount}
                            content_id={value.content_id}
                            display={value.display}
                        />)
                    });
                    const page = <Pagination showQuickJumper defaultCurrent={response.data.data.page_no} total={response.data.data.total} defaultPageSize={response.data.data.per_page} onChange={this.setPageNo}/>
                    //销毁一次组件  因为Pagination 挂载后不会再更新数据
                    this.setState({page: null})
                    this.setState({page})
                } else {
                    this.setState({page: null})
                    blog_item_list.push(<div key={0}>暂无数据</div>)
                }

                this.setState({blog_item_list})
                this.setState({
                    total: response.data.data.total,
                    page_no: response.data.data.page_no,
                    per_page: response.data.data.per_page
                });
                //回到顶部
                window.scrollTo(0, 0);
            }
        });
    }


    render() {
        return (
            <div>
                <NeadLoginButton className="margin-t-5 margin-l-5" component={Button} size="small" type="primary" context="写博客" icon="edit" link_to="/home/editor"/>
                {this.state.blog_item_list}
                {this.state.page}
            </div>
        )
    }
}