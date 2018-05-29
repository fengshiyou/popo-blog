import React from 'react'
import "../../css/blog/BlogItem.css"
import {Icon, Button} from 'antd'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapStateToProps, getAllTags} from '../../action/tagsAction'
import NeadLoginButton from '../login/NeadLoginButton'

class BlogListItem extends React.Component {
    componentDidMount() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //获取所有标签
        dispatch(getAllTags());
    }

    render() {
        //定义标签dom列表
        let tag_list = [];
        //列表类型
        const blog_type = this.props.blog_type;//myblog:个人博客 user:他人博客 home:博客大厅   只有个人博客link特殊
        //保存blog 所属UID
        const blog_uid = this.props.to_uid;
        //如果目标uid是本身 则跳转到自己的博客
        const to_uid = this.props.to_uid == localStorage.getItem('uid') ? "home" : this.props.to_uid;
        //如果有全局标签
        if (this.props.items.length) {
            //标签转数组 1，2，3 转 [1,2,3]  如果没有传tags 则空
            const tags_arr = this.props.tags ? this.props.tags.split(',') : [];
            tags_arr.map((value, key, arr) => {
                //标签背景色
                const back_ground_color = {backgroundColor: this.props.items[value].color}
                //组装标签
                tag_list.push(<Link to={`/${to_uid}/blog/${blog_type}?tag_id=${value}`} className="white margin-l-5 padding-0-5" key={key} style={back_ground_color}>{this.props.items[value].name}</Link>);
            });
        }
        const created_at = this.props.created_at.split('T')[0];
        //@todo 目录的背景色？
        const category_back_ground_color = {backgroundColor: "#a07575"};
        //组装文章目录
        const catalog_list = [];
        if (this.props.catalog) {
            const new_catalog = [];
            const catalog_arr = this.props.catalog.split(",");
            catalog_arr.map(function (value, key, arr) {
                const catalog_info = value.split("|");
                new_catalog[catalog_info[1]] = catalog_info
            });
            new_catalog.map(function (value, key, arr) {
                catalog_list.push(<Link to={`/${to_uid}/blog/${blog_type}?catalog_id=${value[1]}`} key={key} className="blog-item-catalog white">{value[0]}</Link>)
            })
        }
        //编辑按钮
        let editor_button = '';
        if (localStorage.getItem('uid') == blog_uid) {
            editor_button = <NeadLoginButton className="margin-t-5 margin-l-5" component={Button} size="small" context="编辑" icon="edit" link_to={"/home/editor?id=" + this.props.id}/>
        }
        return (
            <div className="blog-item">
                <div className="blog-item-title">
                    <Link className="black" to={`/${to_uid}/article/${this.props.id}`}>{this.props.title}</Link>
                </div>
                <div>
                    <Link className="black" to={`/${to_uid}/blog/${blog_type}`}>
                        <Icon type="user"/>
                        {this.props.acount}
                    </Link>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="calendar"/>
                    <span className="gray-back blog-item-content">{created_at}</span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="message"/>
                    <span className="black-back blog-item-content">({this.props.comment_count})条评论</span>
                </div>
                <div className="inline">
                    <Icon type="bars"/>
                    <span className="blog-item-content" style={category_back_ground_color}>
                        {catalog_list}
                    </span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="tag-o"/>
                    <span>
                    {tag_list}
                    </span>
                </div>
                {editor_button}
            </div>

        )
    }
}

export default connect(mapStateToProps)(BlogListItem)