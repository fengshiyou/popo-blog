import React from 'react'
import BlogListItem from './BlogListItem'
import axios from 'axios'
import {Pagination,Button} from 'antd'
import NeadLoginButton from '../login/NeadLoginButton'
import {getConfig} from "../../until/Tool"

export default class BlogList extends React.Component {
    constructor() {
        super();
        this.state = {blog_item_list: [], search: '', total: 1, page_no: 1,per_page:1,page:'',z:''}
        this.setPageNo = (page_no)=> this._setPageNo(page_no)
    }

    //接收到新的参数的时候触发，传入新参数(变化过的参数)。旧参数还可以通过this.props获得
    componentWillReceiveProps(newProps) {
        //如果查询参数没变化  则不请求后台
        if (this.props.search == newProps.search) {
            return;
        }
        this.setState({search: newProps.search,page_no:1}, this.setBlogItemList)
    }

    componentDidMount() {
        this.setState({search: this.props.search}, this.setBlogItemList)
    }

    _setPageNo(page_no) {
        this.setState({page_no}, this.setBlogItemList)
    }

    setBlogItemList() {
        let url = getConfig("request_get_blog_list");
        if (this.state.search) {
            url += this.state.search + "&page_no=" + this.state.page_no;
        } else {
            url += "?page_no=" + this.state.page_no;
        }
        const blog_item_list = []
        axios.get(url).then(
            response => {
                const response_list = response.data.data.list;
                if(response_list.length > 0){
                    response_list.map(function (value, key, arr) {
                        blog_item_list.push(<BlogListItem
                            title={value.title}
                            key={key}
                            created_at={value.created_at}
                            tags={value.tags}
                            catalog={value.catalog}
                            id={value.id}
                        />)
                    })
                    const page = <Pagination showQuickJumper defaultCurrent={this.state.page_no} total={this.state.total} defaultPageSize={this.state.per_page} onChange={this.setPageNo} />
                    //销毁一次组件  因为Pagination 挂载后不会再更新数据
                    this.setState({page:null})
                    this.setState({page})
                }else{
                    blog_item_list.push(<div key={0}>暂无数据</div>)
                }

                this.setState({blog_item_list})
                this.setState({
                    total:response.data.data.total,
                    page_no:response.data.data.page_no,
                    per_page:response.data.data.per_page
                })

            }
        ).catch()
    }


    render() {
        return (
            <div>
                <NeadLoginButton className="margin-t-5 margin-l-5" component={Button} size="small" type="primary" context="写博客" icon="edit" link_to="/editor"/>
                {this.state.blog_item_list}
                {this.state.page}
            </div>
        )
    }
}